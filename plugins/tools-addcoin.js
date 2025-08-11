// commands/addcoins.js
import { addCoins, getCoins, getCoinName } from '../src/coins.js';

let Handler = async (m, { args }) => {
  const ownerNumber = '527447800928@s.whatsapp.net';
  if (m.sender !== ownerNumber) return m.reply('🚫 Solo el owner puede dar monedas.');

  if (!args || args.length < 2) return m.reply('Uso: .addcoins <@usuario> <cantidad>');

  const mention = args[0];
  const user = mention.replace(/[@\s]/g, '') + '@s.whatsapp.net';
  const amount = parseInt(args[1], 10);

  if (isNaN(amount) || amount <= 0) return m.reply('Cantidad inválida.');

  addCoins(user, amount);
  return m.reply(`✅ Se han añadido ${amount} ${getCoinName()} a ${mention}. Ahora tiene: ${getCoins(user)} ${getCoinName()}.`);
};

Handler.command = ['addcoins'];
export default Handler;