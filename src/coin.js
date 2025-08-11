import fs from 'fs';
import path from 'path';

const coinsPath = path.join(process.cwd(), 'src', 'coins.json');
const configPath = path.join(process.cwd(), 'src', 'coinconfig.json');

// Si no existe el archivo de monedas, lo creamos vacío
if (!fs.existsSync(coinsPath)) {
  fs.writeFileSync(coinsPath, JSON.stringify({}), 'utf-8');
}

// Si no existe el archivo de configuración, lo creamos con nombre por defecto
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify({ name: 'Coins' }, null, 2), 'utf-8');
}

// ==== Funciones de monedas ====
export function getCoins(user) {
  let data = JSON.parse(fs.readFileSync(coinsPath, 'utf-8'));
  return data[user] || 0;
}

export function addCoins(user, amount) {
  let data = JSON.parse(fs.readFileSync(coinsPath, 'utf-8'));
  data[user] = (data[user] || 0) + amount;
  fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2), 'utf-8');
}

export function spendCoins(user, amount) {
  let data = JSON.parse(fs.readFileSync(coinsPath, 'utf-8'));
  if ((data[user] || 0) < amount) return false; // No tiene suficiente
  data[user] -= amount;
  fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2), 'utf-8');
  return true;
}

// ==== Funciones para el nombre de la moneda ====
export function getCoinName() {
  let cfg = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  return cfg.name || 'Coins';
}

export function setCoinName(newName) {
  fs.writeFileSync(configPath, JSON.stringify({ name: newName }, null, 2), 'utf-8');
}