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
  // Upstash Redis (check first - it uses KV_REST_API_URL from Upstash)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { Redis } = require('@upstash/redis');
      // Use fromEnv() which automatically reads KV_REST_API_URL and KV_REST_API_TOKEN
      kv = Redis.fromEnv();
      useKV = true;
      console.log('Using Upstash Redis (from KV_REST_API_URL)');
    } catch (e) {
      console.log('@upstash/redis package not installed, trying @vercel/kv');
      // Fallback to legacy Vercel KV if @upstash/redis not available
      try {
        kv = require('@vercel/kv');
        useKV = true;
        console.log('Using legacy Vercel KV');
      } catch (e2) {
        console.log('Neither @upstash/redis nor @vercel/kv available');
      }
    }
  } else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    // Alternative Upstash Redis env var names (if used)
    try {
      const { Redis } = require('@upstash/redis');
      kv = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      useKV = true;
      console.log('Using Upstash Redis (from UPSTASH_REDIS_REST_URL)');
    } catch (e) {
      console.log('@upstash/redis package not installed');
    }
  } else {
    console.log('No Redis/KV environment variables found');
  }
} catch (e) {
  // KV/Redis not available, will use file-based storage
  console.log('KV/Redis not available, using file-based storage:', e.message);
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
    if (!kv || !useKV) {
      console.log('KV not available for reading:', { kv: !!kv, useKV });
      return [];
    }
    
    // For Vercel KV, try different approaches
    let questions;
    try {
      questions = await kv.get('chat_questions');
    } catch (e) {
      // If direct get fails, try with await
      questions = await Promise.resolve(kv.get('chat_questions'));
    }
    
    // Ensure we return an array
    if (!questions) {
      console.log('No questions found in KV, returning empty array');
      return [];
    }
    if (Array.isArray(questions)) {
      console.log(`Retrieved ${questions.length} questions from KV`);
      return questions;
    }
    console.log('Questions from KV is not an array, returning empty array');
    return [];
  } catch (error) {
    console.error('Error reading from KV/Redis:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      kvType: typeof kv,
      useKV
    });
    return [];
  }
}

/**
 * Save questions to KV/Redis
 */
async function saveQuestionsToKV(questions) {
  try {
    if (!kv || !useKV) {
      console.log('KV not available for saving:', { kv: !!kv, useKV });
      return false;
    }
    
    // Keep only last MAX_QUESTIONS
    const trimmedQuestions = questions.slice(-MAX_QUESTIONS);
    
    console.log('Attempting to save to KV:', {
      count: trimmedQuestions.length,
      kvType: typeof kv,
      hasSetMethod: typeof kv.set === 'function'
    });
    
    await kv.set('chat_questions', trimmedQuestions);
    
    console.log('Successfully saved to KV');
    return true;
  } catch (error) {
    console.error('Error saving to KV/Redis:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      kvType: typeof kv,
      useKV,
      hasSetMethod: typeof kv?.set === 'function'
    });
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

  console.log('Attempting to log question:', {
    question: questionEntry.question.substring(0, 50),
    useKV,
    hasKV: !!kv,
    env: process.env.NODE_ENV,
    kvType: typeof kv
  });

  try {
    // Try KV/Redis first (production)
    if (useKV && kv) {
      console.log('Using KV storage');
      const questions = await getQuestionsFromKV();
      console.log('Retrieved questions from KV:', questions.length);
      
      questions.push(questionEntry);
      const saved = await saveQuestionsToKV(questions);
      
      if (saved) {
        console.log('Successfully saved to KV');
        return questionEntry;
      } else {
        console.log('Failed to save to KV, falling back to file');
      }
    } else {
      console.log('KV not available, using file storage', { useKV, hasKV: !!kv });
    }

    // Fallback to file storage (local/dev or if KV fails)
    console.log('Using file storage fallback');
    const questions = getQuestionsFromFile();
    questions.push(questionEntry);
    saveQuestionsToFile(questions);
    console.log('Saved to file storage');
    return questionEntry;
  } catch (error) {
    console.error('Error logging question:', error);
    console.error('Full error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
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

