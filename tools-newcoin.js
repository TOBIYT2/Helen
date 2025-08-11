// commands/newcoin.js
import { setCoinName, getCoinName } from '../src/coins.js';

let Handler = async (m, { conn, args }) => {
  const botNumber = conn.user?.jid || '';

  if (m.sender !== botNumber) {
    return m.reply('🚫 Solo el número vinculado al bot puede cambiar el nombre de la moneda.');
  }

  if (!args || args.length === 0) {
    return m.reply(`⚠️ Uso: .newcoin <nombre>\n\nNombre actual: ${getCoinName()}`);
  }

  const newName = args.join(' ');
  setCoinName(newName);
  return m.reply(`✅ Ahora la moneda se llama: *${newName}*`);
};

Handler.command = ['newcoin'];
export default Handler;