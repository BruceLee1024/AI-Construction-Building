import { agentTools } from './packages/editor/src/lib/agent/tools'
import OpenAI from 'openai'

async function run() {
  const client = new OpenAI({ apiKey: 'sk-test', baseURL: 'http://localhost:3000' }) // dummy
  try {
    const streamResponse = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'hello' }],
      tools: agentTools,
      tool_choice: 'auto',
      stream: false,
    })
  } catch (err: any) {
    console.error(err)
  }
}
run()
