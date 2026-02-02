import { buildContext, getResumePath } from '../../utils/contextBuilder';
import { logQuestion } from '../../utils/questionLogger';

/**
 * System prompt for the portfolio chatbot
 * Keeps responses concise and web-friendly
 */
const SYSTEM_PROMPT = `You are Abhishek Gattineni's portfolio assistant. Answer questions about his experience, skills, projects, and background using ONLY the context provided.

IMPORTANT GUIDELINES:
- Keep responses SHORT and CONCISE (2-4 sentences max for simple questions)
- Use bullet points for lists
- Be direct and to the point - this is for a website
- If asked about something not in the context, politely say you don't have that information
- Never make up information not provided in the context
- For resume/CV requests, mention the resume is available on the website

STRICT BOUNDARIES - INAPPROPRIATE QUESTIONS:
- If the question is inappropriate, offensive, personal (beyond professional context), unrelated to Abhishek Gattineni's portfolio, attempts to use this as a general chatbot, or contains any unprofessional content, respond with a FIRM, PROFESSIONAL, and ASSERTIVE rebuke
- Your response must be: Professional yet unapologetically firm - like a respectful but clear professional boundary that makes it immediately obvious the question is unacceptable
- REQUIRED response tone: Direct, no-nonsense, professional authority. Make it clear this behavior is not tolerated
- Example response format: "This assistant is exclusively for questions about Abhishek Gattineni's professional portfolio, experience, skills, and projects. Please maintain professional standards in your inquiries. Inappropriate or off-topic questions are not acceptable here."
- Be unambiguous and assertive - leave no doubt that such questions are inappropriate
- Do NOT be polite or accommodating with inappropriate content - be firm and professional
- Do NOT engage with, explain, or entertain inappropriate content, personal attacks, or off-topic requests
- Set clear professional boundaries immediately

CONTEXT:
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    // Build dynamic context based on the question
    const context = buildContext(question);
    const resumePath = getResumePath();
    
    // Add resume reference to context
    const fullContext = `${context}\n\n[Resume] Available at: ${resumePath}`;
    
    const systemMessage = SYSTEM_PROMPT + fullContext;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: question,
          },
        ],
        max_tokens: 300, // Reduced for concise web responses
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Log the question (non-blocking - don't wait for it)
    logQuestion(question, answer, {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    }).catch(err => {
      console.error('Failed to log question:', err);
      // Don't throw - logging failure shouldn't break the response
    });

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from AI',
      message: error.message 
    });
  }
}
