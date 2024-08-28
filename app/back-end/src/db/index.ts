import { sqlite3, Database } from '../libs/sqlite'

const db = new Database({
  filename: ':memory:',
  driver: sqlite3.Database,
})

export default db
