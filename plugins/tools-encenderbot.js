import fs from 'fs'

let handler = async (m, { conn, args }) => {
  const botNumber = conn.user.jid.split('@')[0]
  const senderNumber = m.sender.split('@')[0]

  if (botNumber !== senderNumber) return // Solo el propio bot puede usarlo

  let estado = JSON.parse(fs.readFileSync('./estado-bot.json'))

  const accion = args[0]?.toLowerCase()
  if (accion === 'off') {
    estado.activo = false
    await m.reply('🛑 *Bot apagado*. No responderá a comandos ni funciones automáticas.')
  } else if (accion === 'on') {
    estado.activo = true
    await m.reply('✅ *Bot encendido*. Todo volvió a la normalidad.')
  } else {
    await m.reply('❗ Usa el comando así:\n.adobot on\n.adobot off')
    return
  }

  fs.writeFileSync('./estado-bot.json', JSON.stringify(estado, null, 2))
}

handler.command = /^adobot$/i // Comando será .adobot on / .adobot off
export default handler
