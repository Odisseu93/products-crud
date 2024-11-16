import { App, parseData } from 'vkrun'
import { router } from './routes'

const app = App()

app.use(parseData())
app.use(router)

export { app }
