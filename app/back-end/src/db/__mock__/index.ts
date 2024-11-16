import sqlite3 from 'sqlite3'
import { Database } from 'sqlite'

export const db = new Database({
  filename: ':memory:',
  driver: sqlite3.Database,
})
