import fs from 'fs'

let handler = async (m, { args, conn }) => {
  const botNumber = conn.user.jid.split('@')[0]
  const senderNumber = m.sender.split('@')[0]
  if (botNumber !== senderNumber) return m.reply('⛔ Solo el sistema (bot) puede usar este comando.')

  let estado = { activo: true }
  try {
    estado = JSON.parse(fs.readFileSync('./estado-bot.json'))
  } catch (e) {
    // Si el archivo no existe, se mantiene activo por defecto
  }

  const opcion = args[0]?.toLowerCase()
  if (opcion === 'on') {
    estado.activo = true
    fs.writeFileSync('./estado-bot.json', JSON.stringify(estado))
    await m.reply('✅ Bot encendido correctamente.')
  } else if (opcion === 'off') {
    estado.activo = false
    fs.writeFileSync('./estado-bot.json', JSON.stringify(estado))
    await m.reply('🛑 Bot apagado correctamente.')
  } else {
    await m.reply('📌 Usa:\n.adobot on\n.adobot off')
  }
}

handler.command = /^adobot$/i
export default handler
