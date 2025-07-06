import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    
    if (user.registered === true) {
        return m.reply(`💙 𝗬𝗮 𝘁𝗲 𝗲𝗻𝗰𝘂𝗲𝗻𝘁𝗿𝗮𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼.\n\n¿𝗤𝘂𝗶𝗲𝗿𝗲 𝘃𝗼𝗹𝘃𝗲𝗿 𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘀𝗲?\n\n𝗨𝘀𝗲 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗽𝗮𝗿𝗮 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝘀𝘂 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼.\n*${usedPrefix}unreg*`)
    }

    if (!Reg.test(text)) return m.reply(`Eʟ ғᴏʀᴍᴀᴛᴏ ɪɴɢʀᴇsᴀᴅᴏ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴏ\n\nUsᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ: ${usedPrefix + command} 𝗻𝗼𝗺𝗯𝗿𝗲.𝗲𝗱𝗮𝗱\nEᴊᴇᴍᴘʟᴏ : *${usedPrefix + command} ${name2}.14*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('💙 Eʟ ɴᴏ𝗺𝗯𝗿𝗲 ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪᴏ.')
    if (!age) return m.reply('💙 Lᴀ ᴇᴅᴀᴅ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪ́ᴀ.')
    if (name.length >= 100) return m.reply('💙 El nombre es demasiado largo.')

    age = parseInt(age)
    if (age > 100 || age < 5) return m.reply('*ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].estrellas += 10
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5    

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    }

    let api = await axios.get(`https://delirius-apiofc.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
    let userNationalityData = api.data.result
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'

    let sn = createHash('md5').update(m.sender).digest('hex')
    
    let regbot = `┏━━━━━━━━━━━━━━━━━━⬣
┃⋄ *🎩 𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐨 - 𝐑𝐞𝐦𝐛𝐨𝐭*
┗━━━━━━━━━━━━━━━━━━⬣\n`
    regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
    regbot += `「🫣」𝐍𝐨𝐦𝐛𝐫𝐞: ${name}\n`
    regbot += `「👴」𝐄𝐝𝐚𝐝: ${age} años\n`
    regbot += `「🏙️」𝐏𝐚𝐢𝐬: ${userNationality}\n`
    regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
    regbot += `「💙」𝐑𝐞𝐜𝐨𝐦𝐩𝐞𝐧𝐬𝐚𝐬:\n> `
    regbot += `• 15 Estrellas 🌟\n> `
    regbot += `• 5 RemCoins 😽\n> `
    regbot += `• 245 Experiencia 💸\n> `
    regbot += `• 12 Tokens 💰\n`
    regbot += `꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷\n\n`
    regbot += `🦊 *Canal OFC:* https://whatsapp.com/channel/0029VapASNA9cDDT9yfhXr30`

    await m.react('📪')
    await conn.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/ojsmx7.jpeg' },
        caption: regbot
    }, { quoted: m })

    let channelID = '120363387375075395@newsletter'
    let messageContent = `◉ *Usuarios:* ${m.pushName || 'Anónimo'}\n◉ *País:* ${userNationality || 'Desconocido'}\n◉ *Verificación:* ${user.name}\n◉ *Edad:* ${age} años\n◉ *Número de serie:*\n⤷ ${sn}\n\n😽 *Recompensa:* 600 Remcoins 😼\n*¡Bienvenido/a al bot!*`

    await conn.sendMessage(channelID, {
        text: messageContent
    })
}

handler.help = ['rem']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'rem', 'registrarse', 'registrar']

export default handler