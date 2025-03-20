import DeezerResponse from "../interfaces/DezzerResponse.js";
import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de busca no Deezer
app.get('/search', async (req: Request, res: Response): Promise<void> => {
    const query = req.query.q as string;

    if (!query) {
        res.status(400).json({ error: "É necessário fornecer um termo de busca" });
        return;  // Isso garante que a execução da função seja interrompida aqui
    }

    try {
        const response = await axios.get<DeezerResponse>(`https://api.deezer.com/search?q=${query}`);
        res.json(response.data); // Não precisamos retornar nada aqui
    } catch (error) {
        console.error("Erro ao buscar no Deezer:", error);
        res.status(500).json({ error: "Erro ao buscar músicas" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});