import axios from 'axios'
import { Message } from '../types'

const API_KEY = import.meta.env.VITE_OA_API_KEY
const BASE_URL = 'https://api.openai.com/v1/chat/completions'

export const generateText = async (messages: Message[]) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error generating text:', error)
    throw error
  }
}
