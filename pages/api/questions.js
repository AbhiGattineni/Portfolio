/**
 * API endpoint to view logged questions
 * GET /api/questions - Get all questions
 * GET /api/questions?stats=true - Get statistics
 * DELETE /api/questions - Clear all questions (protected)
 */

import { getQuestions, getQuestionStats, clearQuestions } from '../../utils/questionLogger';

export default async function handler(req, res) {
  // Add CORS headers if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET') {
    try {
      const { stats, limit = 100, sort = 'desc' } = req.query;

      // Return statistics
      if (stats === 'true') {
        const statistics = await getQuestionStats();
        return res.status(200).json({
          success: true,
          stats: statistics
        });
      }

      // Return questions
      const questions = await getQuestions(parseInt(limit), sort);
      return res.status(200).json({
        success: true,
        count: questions.length,
        questions: questions
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch questions',
        message: error.message
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Optional: Add authentication here
      // For now, we'll allow deletion but you should protect this endpoint
      const cleared = await clearQuestions();
      
      if (cleared) {
        return res.status(200).json({
          success: true,
          message: 'All questions cleared successfully'
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Failed to clear questions'
        });
      }
    } catch (error) {
      console.error('Error clearing questions:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to clear questions',
        message: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

