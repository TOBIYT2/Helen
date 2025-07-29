import fs from 'fs'

let handler = async (m, { conn, command }) => {
  const botNumber = conn.user.jid.split('@')[0]
  const senderNumber = m.sender.split('@')[0]

  if (botNumber !== senderNumber) return

  let estado = JSON.parse(fs.readFileSync('./estado-bot.json'))

  if (command === 'off') {
    estado.activo = false
    await m.reply('🛑 Bot *apagado*. Ya no responderá a comandos ni funciones automáticas.')
  } else if (command === 'on') {
    estado.activo = true
    await m.reply('✅ Bot *encendido*. Todo volvió a la normalidad.')
  }

  fs.writeFileSync('./estado-bot.json', JSON.stringify(estado, null, 2))
}

handler.command = ['on', 'off']
export default handler