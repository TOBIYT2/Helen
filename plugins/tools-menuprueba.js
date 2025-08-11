import fs from 'fs';
import path from 'path';
import { spendCoins, getCoins, getCoinName } from '../src/coins.js';

const menuImagePath = path.join(process.cwd(), 'src', 'completado.jpg');

let menuHandler = async (m, { conn }) => {
  const sender = m.sender;
  const cost = 7;
  const coinName = getCoinName();

  if (!spendCoins(sender, cost)) {
    return m.reply(`🚫 No tienes suficientes ${coinName}. Tienes: ${getCoins(sender)} ${coinName}.`);
  }

  let tag = '@' + sender.split('@')[0];
  let menu = `
¡𝗛ola! ${tag}
*Soy Zorro-Bot 🦊*
Has gastado ${cost} ${coinName} en este comando.
`.trim();

  await conn.sendMessage(m.chat, {
    image: fs.readFileSync(menuImagePath),
    caption: menu,
    mentions: [sender]
  }, { quoted: m });
};

menuHandler.command = ['dado', 'ayud', 'hel'];

export default menuHandler;