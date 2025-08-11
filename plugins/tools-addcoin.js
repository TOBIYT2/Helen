import { addCoins, getCoins, getCoinName } from '../src/coins.js';

let addCoinsHandler = async (m, { args }) => {
  const ownerNumber = '527447800928@s.whatsapp.net';
  if (m.sender !== ownerNumber) return m.reply('🚫 Solo el owner puede dar monedas.');

  if (args.length < 2) return m.reply('Uso: .addcoins <@usuario> <cantidad>');

  let user = args[0].replace(/[@\s]/g, '') + '@s.whatsapp.net';
  let amount = parseInt(args[1]);
  if (isNaN(amount) || amount <= 0) return m.reply('Cantidad inválida.');

  addCoins(user, amount);
  m.reply(`✅ Se han añadido ${amount} ${getCoinName()} a ${args[0]}. Ahora tiene: ${getCoins(user)} ${getCoinName()}.`);
};

addCoinsHandler.command = ['addcoins'];

export default addCoinsHandler;