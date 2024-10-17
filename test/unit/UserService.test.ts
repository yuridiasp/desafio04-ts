import { UserService } from '../../src/services/UserService'
import HttpStatusCode from '../../src/helpers/HTTPCode'

const mockUserRepositoryInsert = jest.fn()
const mockUserRepositoryUpdate = jest.fn()
const mockUserRepositoryDelete = jest.fn()
const mockUserRepositoryGet = jest.fn()
const mockUserRepositoryFindById = jest.fn()

jest.mock('../../src/repositories/UserRepository', () => {

    return jest.fn().mockImplementation(() => ({
        insert: mockUserRepositoryInsert,
        update: mockUserRepositoryUpdate,
        delete: mockUserRepositoryDelete,
        get: mockUserRepositoryGet,
        findById: mockUserRepositoryFindById
    }))
})



describe('UserService', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    const { createUser, updateUser, deleteUser, findUserByID, getUsers } = new UserService()

    const mockUser = {
        id: '2',
        name: 'Yuri Dias',
        email: 'yuri@gmail.com'
    }

    it('Sucesso adicionar um novo usuário', async () => {

        mockUserRepositoryInsert.mockReturnValueOnce(true)

        const { status } = await createUser(mockUser.id, mockUser.name, mockUser.email)

        expect(mockUserRepositoryInsert).toHaveBeenCalledWith(mockUser.id, mockUser.name, mockUser.email)
        expect(status).toBe(HttpStatusCode.Created)
    })

    it('Falha adicionar um novo usuário', async () => {

        mockUserRepositoryInsert.mockReturnValueOnce(false)

        const { status, message } = await createUser(mockUser.id, mockUser.name, mockUser.email)

        expect(mockUserRepositoryInsert).toHaveBeenCalledWith('2', 'Yuri Dias', 'yuri@gmail.com')
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe('User creation failed')
    })

    it('Sucesso ao editar um usuário existente', async () => {

        mockUserRepositoryUpdate.mockReturnValueOnce(true)

        const { status } = await updateUser(mockUser)

        expect(mockUserRepositoryUpdate).toHaveBeenCalledWith(mockUser)
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao editar um usuário existente', async () => {

        mockUserRepositoryUpdate.mockReturnValueOnce(false)

        const { status, message } = await updateUser(mockUser)

        expect(mockUserRepositoryUpdate).toHaveBeenCalledWith(mockUser)
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe('User not found')
    })

    it('Sucesso ao apagar um usuário existente', async () => {

        mockUserRepositoryDelete.mockReturnValueOnce(true)

        const { status } = await deleteUser(mockUser.id)

        expect(mockUserRepositoryDelete).toHaveBeenCalledWith(mockUser.id)
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao apagar um usuário existente', async () => {

        mockUserRepositoryDelete.mockReturnValueOnce(false)

        const { status, message } = await deleteUser(mockUser.id)

        expect(mockUserRepositoryDelete).toHaveBeenCalledWith(mockUser.id)
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe('User not found')
    })

    it('Sucesso ao listar um usuário existente', async () => {

        mockUserRepositoryFindById.mockReturnValueOnce(true)

        const { status } = await findUserByID(mockUser.id)

        expect(mockUserRepositoryFindById).toHaveBeenCalledWith(mockUser.id)
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao listar um usuário existente', async () => {

        mockUserRepositoryFindById.mockReturnValueOnce(false)

        const { status, message } = await findUserByID(mockUser.id)

        expect(mockUserRepositoryFindById).toHaveBeenCalledWith(mockUser.id)
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe('User not found')
    })

    it('Sucesso ao listar todos os usuários existentes', async () => {

        mockUserRepositoryGet.mockReturnValueOnce(true)

        const { status } = await getUsers()

        expect(mockUserRepositoryGet).toHaveBeenCalled()
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao listar todos os usuários existentes', async () => {

        mockUserRepositoryGet.mockReturnValueOnce(false)

        const { status, message } = await getUsers()

        expect(mockUserRepositoryGet).toHaveBeenCalled()
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe('Users not found')
    })
})