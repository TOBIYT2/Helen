import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  console.log('🧪 Comando nivel ejecutado correctamente');

  let img = await (await fetch('https://files.catbox.moe/gjgkk4.jpg')).buffer()
  let name = conn.getName(m.sender)
  let user = global.db.data.users[m.sender]

  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    let txt = `💛 *Nombre:* ${name}\n\n`
    txt += `💛 *Nivel:* ${user.level}\n`
    txt += `💛 *XP:* ${user.exp - min} / ${xp}\n\n`
    txt += `💛 Te faltan *${max - user.exp}* XP ¡Sigue intentando! ✨`

    await conn.sendMessage(m.chat, {
      image: img,
      caption: txt
    }, { quoted: m })

    return
  }

  let before = user.level
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

  if (before !== user.level) {
    let txt = `🍭 *¡FELICIDADES!* 🍭\n\n` 
    txt += `🎉 *${before}* ➔ *${user.level}* [ ${user.role} ]\n`
    txt += `🧢 Nivel anterior: ${before}\n`
    txt += `🧢 Nuevo nivel: ${user.level}\n`
    txt += `📅 Fecha: ${new Date().toLocaleString('id-ID')}\n\n`
    txt += `📌 *Consejo:* _Cuanto más uses a *Hinata-Bot*, más subirás de nivel_`

    await conn.sendMessage(m.chat, {
      image: img,
      caption: txt
    }, { quoted: m })
  }
}

handler.help = ['levelup']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'levelup', 'level']
handler.register = true

export default handler