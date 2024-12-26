require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const systemPrompt = process.env.SYSTEM_PROMPT; 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);

exports.genAI = async(req, res) => {
    const { prompt, lectureId } = req.body;
    const authorization = req.cookies.token;
    
    const lectureResponse = await fetch(`http://localhost:7000/lectures/${lectureId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authorization}`,
            'Cookie': `token=${authorization}`
        }
    });
    
    const fileContent = await lectureResponse.json();
    
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash", 
        systemInstruction: `${systemPrompt} ${JSON.stringify(fileContent.files)}` 
    });

    const result = await model.generateContent(prompt);
    return res.status(200).json(result.response.text());
}
