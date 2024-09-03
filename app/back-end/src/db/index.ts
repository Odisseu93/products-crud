import { config, sqliteDb } from '../libs/sqlite'

export const db = sqliteDb
const dbConfig = async (config: any) => await config.execute({ debug: true })

export const dbInit = () =>
  new Promise((resolve, reject) => {
    dbConfig(config)
      .finally(() => resolve('ok'))
      .catch(error => reject(error))
  })
