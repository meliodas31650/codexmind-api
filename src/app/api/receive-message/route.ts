import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { agent, message, projet, user, timestamp } = body

    if (!agent || !message || !projet || !user) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    console.log('[RECEIVED]', { agent, message, projet, user, timestamp })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[RECEIVE-MESSAGE]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
