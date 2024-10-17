import { Request } from 'express'

import { UserController } from '../../src/controllers/UserController'
import { UserService } from '../../src/services/UserService'
import makeMockRequest from '../__mocks__/mockRequest.mock'
import makeMockResponse from '../__mocks__/mockResponse.mock'
import HttpStatusCode from '../../src/helpers/HTTPCode'

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

    it('Falha adicionar um novo usuário', async () => {

    })

    it('Sucesso ao editar um usuário existente', async () => {

    })

    it('Falha ao editar um usuário existente', async () => {

    })

    it('Sucesso ao apagar um usuário existente', async () => {

    })

    it('Falha ao apagar um usuário existente', async () => {

    })

    it('Sucesso ao listar um usuário existente', async () => {

    })

    it('Falha ao listar um usuário existente', async () => {

    })

    it('Sucesso ao listar todos os usuários existentes', async () => {

    })

    it('Falha ao listar todos os usuários existentes', async () => {

    })
})