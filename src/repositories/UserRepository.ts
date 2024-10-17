import db from "../db/db";
import { IUser, User } from "../models/User";

class UserRepository {
    db: IUser[]

    constructor(database = db) {
        this.db = database
    }

    insert = async (id: string, name: string, email: string) => {
        const newUser = new User(id, name, email)
        
        this.db.push(newUser)

        return true
    }

    update = async (newUser: IUser) => {
        const index = this.db.findIndex(user => user.id === newUser.id)

        if (index === -1)
            return false
        
        this.db[index] = newUser
        return true
    }

    delete = async (id: string) => {
        const index = this.db.findIndex(user => user.id === id)

        if (index === -1)
            return false
        
        this.db.splice(index, 1)
        
        return true
    }

    get = async () => this.db

    findById = async (id: string) => this.db.find(user => user.id === id)
}

export default UserRepository