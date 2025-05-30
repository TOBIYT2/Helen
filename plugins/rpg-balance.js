
const handler = async (m, {usedPrefix}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  const name = conn.getName(who);
  m.reply(`╭━〔  ${global.nombrebot}  〕⬣
┋🚩 *Usuario:* ${name}
┋🌟 *Estrellas*: ${global.db.data.users[who].estrellas} 💵
┋💰 *Experiencia:* ${global.db.data.users[who].exp}
╰━━━━━━━━━━━━⬣

╭━〔  ${global.nombrebot}  〕⬣
┃ _Puedes Comprar Mas 🪙_
┃ _Usando Los Siguentes Comandos_
┃ *${usedPrefix}buy <cantidad>*
┃ *${usedPrefix}buyall*
╰━━━━━━━━━━━━⬣`)
};
handler.help = ['bal'];
handler.tags = ['rpg'];
handler.command = ['bal', 'diamantes', 'diamond', 'balance'];
export default handler;
