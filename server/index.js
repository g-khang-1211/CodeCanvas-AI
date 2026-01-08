import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { TextGenerationClient } from "@google/genai"  // backend safe

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Simple endpoint to call Google GenAI
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body
    const client = new TextGenerationClient({ apiKey: process.env.GENAI_API_KEY })
    const response = await client.generateText({
      model: "text-bison-001",
      prompt,
    })
    res.json(response)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
