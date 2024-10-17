import HttpStatusCode from "../helpers/HTTPCode"
import { IUser, User } from "../models/User"
import UserRepository from "../repositories/UserRepository"

interface response {
    message: string
    status: number
    content?: User[] | User | undefined
}

interface IUserService {
    userRepository: UserRepository
    createUser: (id: string, name: string, email: string) => void
    getUsers: () => Promise<response>
    findUserByID: (id: string) => Promise<response>
    deleteUser: (id: string) => void
    updateUser: (user: IUser) => void
}

export class UserService implements IUserService {
    userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    getUsers = async () => {
        const users = await this.userRepository.get()

        const message = users ? '' : 'Users not found'
        const status = users ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status, content: users }
    }
    
    createUser = async (id: string, name: string, email: string) => {
        const result = await this.userRepository.insert(id, name, email)
        
        const message = result ? '' : 'User creation failed'
        const status = result ? HttpStatusCode.Created : HttpStatusCode.NoContent

        return { message, status }
    }

    findUserByID = async (id: string) => {
        const user = await this.userRepository.findById(id)

        const message = user ? '' : 'User not found'
        const status = user ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status, content: user }
    }

    deleteUser = async (id: string) => {
        const result = await this.userRepository.delete(id)

        const message = result ? '' : 'User not found'
        const status = result ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status }
    }

    updateUser = async (user: IUser) => {
        const result = await this.userRepository.update(user)

        const message = result ? '' : 'User not found'
        const status = result ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status }
    }
}