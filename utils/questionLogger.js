/**
 * Question Logger - Tracks all questions asked in the chat
 * Supports both Vercel KV (production) and file-based storage (local/dev)
 */

import fs from 'fs';
import path from 'path';

// Try to import Vercel KV / Upstash Redis (only available in production with KV configured)
let kv = null;
let useKV = false;
try {
  // Support both old Vercel KV and new Upstash Redis
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      kv = require('@vercel/kv');
      useKV = true;
    } catch (e) {
      console.log('@vercel/kv package not installed');
    }
  } else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    // Upstash Redis (new recommended approach)
    try {
      const { Redis } = require('@upstash/redis');
      kv = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      useKV = true;
    } catch (e) {
      console.log('@upstash/redis package not installed');
    }
  }
} catch (e) {
  // KV/Redis not available, will use file-based storage
  console.log('KV/Redis not available, using file-based storage');
}

const QUESTIONS_FILE = path.join(process.cwd(), 'data', 'questions.json');
const MAX_QUESTIONS = 1000; // Keep last 1000 questions

/**
 * Ensure data directory exists
 */
function ensureDataDir() {
  const dataDir = path.dirname(QUESTIONS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(QUESTIONS_FILE)) {
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify([], null, 2));
  }
}

/**
 * Get questions from file storage
 */
function getQuestionsFromFile() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(QUESTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading questions file:', error);
    return [];
  }
}

/**
 * Save questions to file storage
 */
function saveQuestionsToFile(questions) {
  try {
    ensureDataDir();
    // Keep only last MAX_QUESTIONS
    const trimmedQuestions = questions.slice(-MAX_QUESTIONS);
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(trimmedQuestions, null, 2));
  } catch (error) {
    console.error('Error saving questions file:', error);
  }
}

/**
 * Get questions from KV/Redis
 */
async function getQuestionsFromKV() {
  try {
    if (!kv || !useKV) return [];
    const questions = await kv.get('chat_questions');
    return questions || [];
  } catch (error) {
    console.error('Error reading from KV/Redis:', error);
    return [];
  }
}

/**
 * Save questions to KV/Redis
 */
async function saveQuestionsToKV(questions) {
  try {
    if (!kv || !useKV) return false;
    // Keep only last MAX_QUESTIONS
    const trimmedQuestions = questions.slice(-MAX_QUESTIONS);
    await kv.set('chat_questions', trimmedQuestions);
    return true;
  } catch (error) {
    console.error('Error saving to KV/Redis:', error);
    return false;
  }
}

/**
 * Log a question to storage
 * @param {string} question - The question asked
 * @param {string} answer - The answer provided (optional)
 * @param {object} metadata - Additional metadata (timestamp, IP, etc.)
 */
export async function logQuestion(question, answer = null, metadata = {}) {
  const questionEntry = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    question: question.trim(),
    answer: answer ? answer.substring(0, 500) : null, // Truncate long answers
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    ...metadata
  };

  try {
    // Try KV/Redis first (production)
    if (useKV && kv) {
      const questions = await getQuestionsFromKV();
      questions.push(questionEntry);
      const saved = await saveQuestionsToKV(questions);
      if (saved) {
        return questionEntry;
      }
    }

    // Fallback to file storage (local/dev or if KV fails)
    const questions = getQuestionsFromFile();
    questions.push(questionEntry);
    saveQuestionsToFile(questions);
    return questionEntry;
  } catch (error) {
    console.error('Error logging question:', error);
    // Don't throw - logging shouldn't break the chat
    return questionEntry;
  }
}

/**
 * Get all logged questions
 * @param {number} limit - Maximum number of questions to return
 * @param {string} sort - 'asc' or 'desc' (default: 'desc' - newest first)
 */
export async function getQuestions(limit = 100, sort = 'desc') {
  try {
    let questions = [];

    // Try KV/Redis first
    if (useKV && kv) {
      questions = await getQuestionsFromKV();
    } else {
      // Fallback to file storage
      questions = getQuestionsFromFile();
    }

    // Sort questions
    questions.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sort === 'desc' ? timeB - timeA : timeA - timeB;
    });

    // Apply limit
    return questions.slice(0, limit);
  } catch (error) {
    console.error('Error getting questions:', error);
    return [];
  }
}

/**
 * Get question statistics
 */
export async function getQuestionStats() {
  try {
    const questions = await getQuestions(10000); // Get all for stats
    
    const stats = {
      total: questions.length,
      today: questions.filter(q => {
        const qDate = new Date(q.timestamp);
        const today = new Date();
        return qDate.toDateString() === today.toDateString();
      }).length,
      thisWeek: questions.filter(q => {
        const qDate = new Date(q.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return qDate >= weekAgo;
      }).length,
      thisMonth: questions.filter(q => {
        const qDate = new Date(q.timestamp);
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return qDate >= monthAgo;
      }).length,
      storageType: useKV ? (process.env.UPSTASH_REDIS_REST_URL ? 'Upstash Redis' : 'Vercel KV') : 'File System'
    };

    return stats;
  } catch (error) {
    console.error('Error getting question stats:', error);
    return {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      storageType: 'Unknown'
    };
  }
}

/**
 * Clear all questions (use with caution!)
 */
export async function clearQuestions() {
  try {
    if (useKV && kv) {
      await kv.set('chat_questions', []);
    } else {
      saveQuestionsToFile([]);
    }
    return true;
  } catch (error) {
    console.error('Error clearing questions:', error);
    return false;
  }
}

export default {
  logQuestion,
  getQuestions,
  getQuestionStats,
  clearQuestions
};

