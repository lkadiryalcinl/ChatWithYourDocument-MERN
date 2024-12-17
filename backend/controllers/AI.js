require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const systemPrompt = process.env.SYSTEM_PROMPT; 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);

exports.genAI = async(req, res) => {
    const prompt = req.body.prompt;
    const authorization = req.cookies.token;
    
    const fileResponse = await fetch("http://localhost:7000/files/67617ec8b660b52bdc8ccef9", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authorization}`,
            'Cookie': `token=${authorization}`
        }
    });
    
    const fileContent = JSON.stringify(await fileResponse.json());
    
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash", 
        systemInstruction: `${systemPrompt} ${fileContent}` 
    });

    const result = await model.generateContent(prompt);
    return res.status(200).json(result.response.text());
}
