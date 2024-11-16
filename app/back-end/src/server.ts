import { app } from './app'
import { dbInit } from './db'

app.server().listen(3000, async () => {
  await dbInit()
  console.log('Server is running on port 3000')
})
