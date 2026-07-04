
import sqlite3 from "sqlite3";
import { open } from "sqlite";


export const database = await open({
  filename: '/home/ahmed/honodb.db',
  driver: sqlite3.Database
})



export async function initDatabase() {
  await database.exec(
    `CREATE TABLE IF NOT EXISTS posts(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`
  )
}


