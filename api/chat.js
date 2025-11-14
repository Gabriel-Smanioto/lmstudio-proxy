import fetch from "node-fetch";

export default async function handler(req, res) {
    const LMSTUDIO_URL = "http://26.127.96.152:1234/v1/chat/completions";
    const LMSTUDIO_API_KEY = "lm-studio";

    try {
        const r = await fetch(LMSTUDIO_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${LMSTUDIO_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await r.json();
        res.status(200).json(data);

    } catch (e) {
        res.status(500).json({ error: "Falha ao acessar LM Studio" });
    }
}
