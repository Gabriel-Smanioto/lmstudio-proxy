import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// URL DO LM STUDIO
const LMSTUDIO_URL = "http://26.127.96.152:1234";

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await fetch(`${LMSTUDIO_URL}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.json(data);

  } catch (error) {
    console.error("Erro no proxy:", error);
    return res.status(500).json({
      error: "Falha ao conectar ao LM Studio."
    });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Proxy LM Studio ativo.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy rodando na porta " + PORT);
});
