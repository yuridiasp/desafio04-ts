import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

interface IUserController {
    createUserController: (request: Request, response: Response) => void
    getUsersController: (request: Request, response: Response) => void
    getUserController: (request: Request, response: Response) => void
    deleteUserController: (request: Request, response: Response) => void
    editUserController: (request: Request, response: Response) => void
}

export class UserController implements IUserController {
    userService: UserService
    
    constructor(userService = new UserService()) {
        this.userService = userService
    }

    getUsersController = async (request: Request, response: Response) => {
        const { content, message, status } = await this.userService.getUsers()

        if (!content) {
            response.status(status).json({ message })
        }
        
        response.status(status).json(content)
    }

    deleteUserController = async (request: Request, response: Response) => {
        const { message, status } = await this.userService.deleteUser(request.body.id)

        response.status(status).json({ message })
    }

    editUserController = async (request: Request, response: Response) => {
        const { id, name, email } = request.body

        const { message, status } = await this.userService.updateUser({ id, name, email })

        response.status(status).json({ message })
    }

    getUserController = async (request: Request, response: Response) => {
        const { content, message, status } = await this.userService.findUserByID(request.params.id)

        if (!content) {
            response.status(status).json({ message })
        }
        
        response.status(status).json(content)
    }

    createUserController = async (request: Request, response: Response) => {
        const { id, name, email } = request.body
        const { message, status } = await this.userService.createUser(id, name, email)

        response.status(status).json({ message })
    }
}