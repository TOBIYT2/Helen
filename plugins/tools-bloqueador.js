import fs from 'fs'

let handler = async (m, { conn }) => {
  const estado = JSON.parse(fs.readFileSync('./estado-bot.json'))
  const botNumber = conn.user.jid.split('@')[0]
  const senderNumber = m.sender.split('@')[0]

  if (!estado.activo && botNumber !== senderNumber) return !0
}

export default handler