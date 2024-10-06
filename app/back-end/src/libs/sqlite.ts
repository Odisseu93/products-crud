import sqlite3 from 'sqlite3'
import { Database } from 'sqlite'
import path from 'path'
import { db } from '../db'

export const queries = [
  'CREATE TABLE IF NOT EXISTS "products" ( id TEXT NOT NULL, name TEXT NOT NULL, price REAL NOT NULL, PRIMARY KEY(id))',
]

const sqlFile = path.join(__dirname, '../db/database.sql')

const sqliteDb = new Database({
  filename: sqlFile,
  driver: sqlite3.Database,
})

const config = {
  execute: async () => {
    await sqliteDb.open()
    await Promise.all(queries.map(query => db.exec(query)))
    await sqliteDb.close()
  },
}

const sqliteInMemoryDb = new Database({
  filename: ':memory:',
  driver: sqlite3.Database,
})

//https://www.npmjs.com/package/sqlite

export { sqliteDb, sqliteInMemoryDb, config }
