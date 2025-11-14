import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Libera acesso pro AI Studio
app.use(cors());
app.use(express.json());

const LMSTUDIO_URL = "http://localhost:1234/v1/chat/completions";
const LMSTUDIO_API_KEY = "lm-studio";

// Rota que o seu front vai chamar:
app.post("/chat", async (req, res) => {
    try {
        const response = await fetch(LMSTUDIO_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${LMSTUDIO_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.error("Erro:", err);
        res.status(500).json({ error: "Erro ao acessar LM Studio" });
    }
});

// Porta do servidor local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy rodando na porta ${PORT}`));
