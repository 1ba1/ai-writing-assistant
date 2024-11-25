import axios from 'axios'

const API_KEY = process.env.OA_API_KEY
const BASE_URL = "https://api.openai.com/v1/chat/completions"

export const generateText = async (messages: string) => {
    try {
        const response = await axios.post(
            BASE_URL,
            {
                model: "gpt-3.5-turbo", // or "gpt-4"
                messages: messages, // array of { role: "user"/"assistant", content: "text" }
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        )
        return response.data.choices[0].message.content
    } catch (error) {
        console.error("Error generating text:", error)
        throw error
    }
}
