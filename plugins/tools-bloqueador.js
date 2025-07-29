import fs from 'fs'

let handler = async (m, { conn }) => {
  let estado
  try {
    estado = JSON.parse(fs.readFileSync('./estado-bot.json'))
  } catch (e) {
    estado = { activo: true }
  }

  const botNumber = conn.user.jid.split('@')[0]
  const senderNumber = m.sender.split('@')[0]

  // Si el bot está apagado y el que habla no es el propio bot, bloquear todo
  if (!estado.activo && botNumber !== senderNumber) return !0
}

export default handler
