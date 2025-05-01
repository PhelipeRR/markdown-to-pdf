import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./config/logger";
import { marked } from "marked";
import { generatePDF } from "./utils/pdfGenerator"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/convert", async (req: Request, res: Response): Promise<void> => {
    try {
        const { markdown, css, name } = req.body;
        if (!markdown) {
            res.status(400).json({ error: "Markdown é obrigatório" });
            return;
        }
        const html = await marked(markdown);
        const pdfBuffer = await generatePDF(html, css);


        const pdfBase64 = pdfBuffer.toString("base64");

        res.json({
            fileName: `${name}.pdf`,
            base64: pdfBase64,
        });

    } catch (error) {
        logger.error("Erro ao gerar PDF", error);
        res.status(500).json({ error: "Erro interno" });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    logger.info(`🚀 Servidor rodando em http://localhost:${PORT}`);
});