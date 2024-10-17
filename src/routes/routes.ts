import { Router  } from "express"

import { UserController } from "../controllers/UserController"
const { createUserController, deleteUserController, updateUserController, getUserController, getUsersController } = new UserController()

const router = Router()

router.get('/user', getUsersController)
router.get('/user/:id', getUserController)
router.post('/user', createUserController)
router.put('/user', updateUserController)
router.delete('/user', deleteUserController)

export default router