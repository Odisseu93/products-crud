import { App, parseData } from 'vkrun'

const app = App()

app.use(parseData())

export { app }
