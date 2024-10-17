import { Request } from 'express'

import { UserController } from '../../src/controllers/UserController'
import { UserService } from '../../src/services/UserService'
import makeMockRequest from '../__mocks__/mockRequest.mock'
import makeMockResponse from '../__mocks__/mockResponse.mock'
import HttpStatusCode from '../../src/helpers/HTTPCode'
import db from '../../src/db/db'
import ErrosMessage from '../../src/helpers/ErrorMessages'

const mockUserControllerCreateUser = jest.fn()
const mockUserControllerGetUsers = jest.fn()
const mockUserControllerFindUserByID = jest.fn()
const mockUserControllerDeleteUser = jest.fn()
const mockUserControllerUpdateUser = jest.fn()

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: mockUserControllerCreateUser,
        getUsers: mockUserControllerGetUsers,
        findUserByID: mockUserControllerFindUserByID,
        deleteUser: mockUserControllerDeleteUser,
        updateUser: mockUserControllerUpdateUser
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    const userController = new UserController(mockUserService as UserService)

    it('Sucesso adicionar um novo usuário', async () => {

        mockUserControllerCreateUser.mockResolvedValueOnce({ message: '', status: HttpStatusCode.Created })

        const mockRequest = {
            body: {
                id: '2',
                name: 'Yuri',
                email: 'yuri@gmail.com'
            }
        } as Request

        const mockResponse = makeMockResponse()

        await userController.createUserController(mockRequest, mockResponse)
        
        expect(mockUserControllerCreateUser).toHaveBeenCalledWith(mockRequest.body.id, mockRequest.body.name, mockRequest.body.email)
        expect(mockResponse.state.status).toBe(HttpStatusCode.Created)
    })

    it('Falha ao adicionar um novo usuário', async () => {
        mockUserControllerCreateUser.mockResolvedValueOnce({ message: ErrosMessage.processFailure.userCreation, status: HttpStatusCode.NoContent })

        const mockRequest = {
            body: {
                id: '2',
                name: 'Yuri',
                email: 'yuri@gmail.com'
            }
        } as Request

        const mockResponse = makeMockResponse()

        await userController.createUserController(mockRequest, mockResponse)
        
        expect(mockUserControllerCreateUser).toHaveBeenCalledWith(mockRequest.body.id, mockRequest.body.name, mockRequest.body.email)
        expect(mockResponse.state.status).toBe(HttpStatusCode.NoContent)
    })

    it('Sucesso ao editar um usuário existente', async () => {
        mockUserControllerUpdateUser.mockResolvedValueOnce({ message: '', status: HttpStatusCode.OK })

        const mockRequest = {
            body: {
                id: '2',
                name: 'Yuri Dias Pereira',
                email: 'yuri@gmail.com'
            }
        } as Request

        const mockResponse = makeMockResponse()

        await userController.updateUserController(mockRequest, mockResponse)
        
        expect(mockUserControllerUpdateUser).toHaveBeenCalledWith(mockRequest.body)
        expect(mockResponse.state.status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao editar um usuário existente', async () => {
        mockUserControllerUpdateUser.mockResolvedValueOnce({ message: ErrosMessage.notFound.user, status: HttpStatusCode.NoContent })

        const mockRequest = {
            body: {
                id: '2',
                name: 'Yuri Dias Pereira',
                email: 'yuri@gmail.com'
            }
        } as Request

        const mockResponse = makeMockResponse()

        await userController.updateUserController(mockRequest, mockResponse)
        
        expect(mockUserControllerUpdateUser).toHaveBeenCalledWith(mockRequest.body)
        expect(mockResponse.state.status).toBe(HttpStatusCode.NoContent)
    })

    it('Sucesso ao apagar um usuário existente', async () => {
        mockUserControllerDeleteUser.mockResolvedValueOnce({ message: '', status: HttpStatusCode.OK })

        const mockRequest = {
            body: {
                id: '2'
            }
        } as Request

        const mockResponse = makeMockResponse()

        await userController.deleteUserController(mockRequest, mockResponse)
        
        expect(mockUserControllerDeleteUser).toHaveBeenCalledWith(mockRequest.body.id)
        expect(mockResponse.state.status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao apagar um usuário existente', async () => {
        mockUserControllerDeleteUser.mockResolvedValueOnce({ message: ErrosMessage.notFound.user, status: HttpStatusCode.NoContent })

        const mockRequest = {
            body: {
                id: '2'
            }
        } as Request

        const mockResponse = makeMockResponse()

        await userController.deleteUserController(mockRequest, mockResponse)
        
        expect(mockUserControllerDeleteUser).toHaveBeenCalledWith(mockRequest.body.id)
        expect(mockResponse.state.status).toBe(HttpStatusCode.NoContent)
    })

    it('Sucesso ao listar um usuário existente', async () => {
        mockUserControllerFindUserByID.mockResolvedValueOnce({ status: HttpStatusCode.OK, content: db[0]})

        const mockRequest = {
            params: {
                id: '1'
            }
        } as unknown as Request

        const mockResponse = makeMockResponse()

        await userController.findUserByID(mockRequest, mockResponse)
        
        expect(mockUserControllerFindUserByID).toHaveBeenCalledWith(mockRequest.params.id)
        expect(mockResponse.state.status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao listar um usuário existente', async () => {
        mockUserControllerFindUserByID.mockResolvedValueOnce({ status: HttpStatusCode.NoContent, content: undefined})

        const mockRequest = {
            params: {
                id: '1'
            }
        } as unknown as Request

        const mockResponse = makeMockResponse()

        await userController.findUserByID(mockRequest, mockResponse)
        
        expect(mockUserControllerFindUserByID).toHaveBeenCalledWith(mockRequest.params.id)
        expect(mockResponse.state.status).toBe(HttpStatusCode.NoContent)
    })

    it('Sucesso ao listar todos os usuários existentes', async () => {
        mockUserControllerGetUsers.mockResolvedValueOnce({content: db, status: HttpStatusCode.OK})

        const mockRequest = {} as Request

        const mockResponse = makeMockResponse()

        await userController.getUsersController(mockRequest, mockResponse)
        
        expect(mockUserControllerGetUsers).toHaveBeenCalled()
        expect(mockResponse.state.status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao listar todos os usuários existentes', async () => {
        mockUserControllerGetUsers.mockResolvedValueOnce({content: [], status: HttpStatusCode.NoContent})

        const mockRequest = {} as Request

        const mockResponse = makeMockResponse()

        await userController.getUsersController(mockRequest, mockResponse)
        
        expect(mockUserControllerGetUsers).toHaveBeenCalled()
        expect(mockResponse.state.status).toBe(HttpStatusCode.NoContent)
    })
})