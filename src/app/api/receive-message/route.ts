import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, agent, projet, user } = body

    if (!prompt || !agent || !projet || !user) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL non définie' }, { status: 500 })
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, agent, projet, user })
    })

    const data = await res.json()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[SEND-MESSAGE]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
