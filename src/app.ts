import express, { Request, Response } from 'express'

import router from './routes/routes'

export const App = () => {
    const app = express()

    app.use(express.json())

    app.get('/', (request: Request, response: Response) => {
        response.status(200).json({ message: 'Dio Bank API' })
    })

    app.use(router)

    return app
}