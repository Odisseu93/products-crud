
import { sqliteInMemoryDb, config } from '../../libs/sqlite'

export const db = sqliteInMemoryDb
const dbConfig = async (config: any) => await config.execute({ debug: true })

export const dbInit = () =>
  new Promise((resolve, reject) => {
    dbConfig(config)
      .finally(() => resolve('ok'))
      .catch(error => reject(error))
  })
