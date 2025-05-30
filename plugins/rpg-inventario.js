import db from '../lib/database.js';
import daily from './rpg-daily.js'; 
import weekly from './rpg-weekly.js';
import monthly from './rpg-mensual.js';  
import dungeon from './rpg-mazmorra.js'; 
import levelUp from './rpg-levelup.js'; 
import heal from './rpg-heal.js'; 
import halloween from './rpg-halloween.js'; 
import treasureChest from './rpg-cofre.js'; 
import annual from './rpg-annual.js'; 
import work from './rpg-trabajar.js'; 
import slot from './rpg-slot.js'; 
import shop from './rpg-shop.js'; 
import roulette from './fun-ruleta.js';  
import mine from './rpg-minar.js'; 
import crime from './rpg-crimen.js'; 
import casino from './fun-casino.js'; 
import cf from './rpg-cf.js'; 
import bank from './rpg-bank.js'; 
import { canLevelUp, xpRange } from '../lib/levelling.js';
import PhoneNumber from 'awesome-phonenumber';
import moment from 'moment-timezone';
import fs from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, '👤 El usuario no se encuentra en mi base de Datos.', m);
    }

    let user = global.db.data.users[who];
    let name = conn.getName(who);

    // Verificación de estado premium
    let premium = user.premium ? '✅' : '❌';

    let text = `╭━〔 Inventario de ${name} 〕⬣\n` +
               `┋ ⭐ *Estrellasen Cartera:* ${user.estrellas || 0} 🍪\n` +  // Cookies
               `┋ 💸 *Dólares en Banco:* ${user.bank || 0} 🍪\n` +  // Cookies en banco
               `┋ 💎 *Esmeraldas:* ${user.emerald || 0}\n` +  // Esmeraldas
               `┋ 🔩 *Hierro:* ${user.iron || 0}\n` +  // Hierro
               `┋ 🏅 *Oro:* ${user.gold || 0}\n` +  // Oro
               `┋ 🕋 *Carbón:* ${user.coal || 0}\n` +  // Carbón
               `┋ 🪨 *Piedra:* ${user.stone || 0}\n` +  // Piedra
               `┋ 💰 *Experiencia:* ${user.exp || 0}\n` +  // Experiencia
               `┋ ❤️ *Salud:* ${user.health || 100}\n` +  // Salud
               `┋ 💎 *Diamantes:* ${user.diamond || 0}\n` +  // Diamantes
               `┋ 🪙 *RemCoins:* ${user.money || 0}\n` +  // YukiCoins
               `┋ 🍬 *Dulces:* ${user.candies || 0}\n` +  // Dulces (regalos de Halloween)
               `┋ 🎁 *Regalos:* ${user.gifts || 0}\n` +  // Regalos de Halloween
               `┋ 🎟️ *Tokens:* ${user.joincount || 0}\n` +  // Tokens
               `┋ ⚜️ *Premium:* ${premium}\n` +  // Estado premium
               `┋ 🥤 *Pociones:* ${user.potion || 0}\n` +  // Pociones
               `┋ 📅 *Última Actividad de Caza:* ${user.lastHunt || 'Nunca'}\n` +  // Última actividad de caza
               `┋ 📅 *Fecha:* ${new Date().toLocaleString('id-ID')}\n` +
               `╰━━━━━━━━━━━━⬣`;

    await conn.reply(m.chat, text, m);
}

handler.help = ['inventario', 'inv']
handler.tags = ['rpg']
handler.command = ['inventario', 'inv'] 
handler.register = true 

export default handler;