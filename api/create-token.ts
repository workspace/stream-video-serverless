import type { VercelRequest, VercelResponse } from '@vercel/node'
import { StreamVideoServerClient } from '@stream-io/video-client'

const client = new StreamVideoServerClient(
  process.env.API_KEY as string,
  {
    secret: process.env.API_SECRET
  }
);

export default function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = req.headers['api-key']
  if (!apiKey || Array.isArray(apiKey) || apiKey.trim() !== process.env.API_KEY) {
    throw new Error("api key is missing, empty, or not a valid api key.");
  }

  const { userId } = req.query
  if (!userId || Array.isArray(userId) || userId.trim() === '') {
    throw new Error("User ID is missing, empty, or not a valid string.");
  }
  const token = client.createToken(userId)
  return res.json({
    userId: userId,
    token: token,
  })
}
