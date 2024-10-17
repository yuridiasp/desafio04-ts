import ErrosMessage from "../helpers/ErrorMessages"
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

function buildMessageResult (successCondiction: boolean | IUser | IUser[] | undefined, erros: string[], defaultMessage: string) {
    let message = ''
    let errorMessage = 'Error: '

    if (!successCondiction) {
        message = message.concat(defaultMessage, '\n')
    }

    if (erros.length) {
        message = message.concat(erros.join('\n'))
    }
    
    if (message.length) {
        message = errorMessage.concat(message)
    }
    
    return message
}

export class UserService implements IUserService {
    userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    getUsers = async () => {
        const users = await this.userRepository.get()

        const message = buildMessageResult(users, [], ErrosMessage.notFound.allUsers)
        const status = users ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status, content: users }
    }
    
    createUser = async (id: string, name: string, email: string) => {

        const erros: string[] = []

        if (!id) {
            erros.push(ErrosMessage.missingArgument.id)
        }

        if (!name) {
            erros.push(ErrosMessage.missingArgument.name)
        }

        if (!email) {
            erros.push(ErrosMessage.missingArgument.email)
        }

        const result = erros.length ? false : await this.userRepository.insert(id, name, email)
        
        const message = buildMessageResult(result, erros, ErrosMessage.processFailure.userCreation)

        const status = result ? HttpStatusCode.Created : HttpStatusCode.NoContent
        
        
        return { message, status }
    }

    findUserByID = async (id: string) => {
        const erros: string[] = []

        if (!id) {
            erros.push(ErrosMessage.missingArgument.id)
        }

        const user = erros.length ? undefined : await this.userRepository.findById(id)

        const message = buildMessageResult(user, erros, ErrosMessage.notFound.user)
        const status = user ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status, content: user }
    }

    deleteUser = async (id: string) => {
        const erros: string[] = []

        if (!id) {
            erros.push(ErrosMessage.missingArgument.id)
        }

        const result = erros.length ? false : await this.userRepository.delete(id)

        const message = buildMessageResult(result, erros, ErrosMessage.notFound.user)
        const status = result ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status }
    }

    updateUser = async (user: IUser) => {
        const erros: string[] = []

        if (!user) {
            erros.push(ErrosMessage.missingArgument.user)
        }

        const result = erros.length ? false : await this.userRepository.update(user)

        const message = buildMessageResult(result, erros, ErrosMessage.notFound.user)
        const status = result ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status }
    }
}