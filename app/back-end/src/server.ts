import { App, parseData } from 'vkrun'
import { dbInit } from './db'
import { router } from './routes'

const app = App()

app.use(parseData())
app.use(router)

app.server().listen(3000, async () => {
  await dbInit()
  console.log('Server is running on port 3000')
})
