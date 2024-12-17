const fs = require("fs");
const WordExtractor = require("word-extractor");
const pptx2json = require("pptx2json");
const pdfParse = require("pdf-parse");
const xlsx = require("xlsx");

const extractDocxText = async (filePath) => {
    const extractor = new WordExtractor();
    const extracted = await extractor.extract(filePath);

    const pages = extracted.getBody().split("\f").map((text, index) => ({
        pageNum: index + 1,
        text: text.trim(),
    }));

    return { content: pages };
};

const extractPdfText = async (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);
    const rawText = pdfData.text.trim();

    const pages = rawText.split("\n\n").filter((text) => text.trim() !== "").map((text, index) => ({
        pageNum: index + 1,
        text: text.trim(),
    }));

    return { content: pages };
};

const extractPptxText = async (filePath) => {
    try {
        const pptx2jsonInstance = new pptx2json();
        const data = await pptx2jsonInstance.toJson(filePath);
        const slides = Object.keys(data).filter(key => key.startsWith("ppt/slides/slide") && key.endsWith(".xml"));

        if (slides.length === 0) {
            throw new Error("Invalid PPTX format: 'slides' property is missing");
        }

        const pages = slides.map((slideKey, index) => {
            const slide = data[slideKey];
            const text = slide['p:sld'] ? slide['p:sld'].text || "No Text" : "No Text";
            return {
                pageNum: index + 1,
                text: text
            };
        });

        return { content: pages };
    } catch (err) {
        throw new Error(err.message);
    }
};

const extractXlsxText = async (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const pages = workbook.SheetNames.map((sheetName, index) => ({
        pageNum: index + 1,
        text: xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName]).trim(),
    }));

    return { content: pages };
};

exports.processFile = async (file) => {
    switch (file.mimetype) {
        case "application/pdf":
            return extractPdfText(file.path);
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return extractDocxText(file.path);
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return extractPptxText(file.path);
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return extractXlsxText(file.path);
        default:
            throw new Error("Unsupported file type");
    }
};
