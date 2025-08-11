import { setCoinName, getCoinName } from '../src/coins.js';

let newCoinHandler = async (m, { conn, args }) => {
  const botNumber = conn.user?.jid || '';

  if (m.sender !== botNumber) {
    return m.reply('🚫 Solo el número vinculado al bot puede cambiar el nombre de la moneda.');
  }

  if (!args[0]) {
    return m.reply(`⚠️ Uso: .newcoin <nombre>\n\nNombre actual: ${getCoinName()}`);
  }

  const newName = args.join(' ');
  setCoinName(newName);

  m.reply(`✅ Ahora la moneda se llama: *${newName}*`);
};

newCoinHandler.command = ['newcoin'];

export default newCoinHandler;