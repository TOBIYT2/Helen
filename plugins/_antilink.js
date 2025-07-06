let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return !0
  if (!m.isGroup) return !1

  let chat = global.db.data.chats[m.chat]
  let delet = m.key.participant
  let bang = m.key.id
  let bot = global.db.data.settings[this.user.jid] || {}
  const isGroupLink = linkRegex.exec(m.text)
  const grupo = `https://chat.whatsapp.com`

  // ✅ Si es admin y anti-link está activo
  if (isAdmin && chat.antiLink && m.text.includes(grupo)) {
    return conn.reply(m.chat, `😾 *¡Hey! El anti-link está activo, pero eres admin. ¡Salvado!*\n\n👑 https://whatsapp.com/channel/0029VapASNA9cDDT9yfhXr30`, m)
  }

  // 🚫 Si no es admin y envió un link
  if (chat.antiLink && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
      if (m.text.includes(linkThisGroup)) return !0
    }

    await conn.reply(m.chat, `📎 *¡Enlace detectado!*\n\n*${await this.getName(m.sender)}*, mandaste un enlace prohibido y serás eliminado.\n\n👑 https://whatsapp.com/channel/0029VapASNA9cDDT9yfhXr30`, m)

    if (!isBotAdmin) {
      return conn.reply(m.chat, `🥹 *No soy admin, no puedo eliminar intrusos pi pi pi*\n\n👑 https://whatsapp.com/channel/0029VapASNA9cDDT9yfhXr30`, m)
    }

    if (isBotAdmin) {
      await conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: bang,
          participant: delet
        }
      })
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    } else if (!bot.restrict) {
      return conn.reply(m.chat, `*¡Esta característica está desactivada!*\n\n👑 https://whatsapp.com/channel/0029VapASNA9cDDT9yfhXr30`, m)
    }
  }

  return !0
}