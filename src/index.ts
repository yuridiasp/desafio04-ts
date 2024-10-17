import { App } from './app'

const PORT = '5000'

const app = App()

app.listen(PORT, () => {
    console.log("Server on")
})