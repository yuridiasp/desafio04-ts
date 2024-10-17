export interface IUser {
    id: string
    name: string
    email: string
}

export class User implements IUser {
    id: string
    name: string
    email: string
    constructor(id: string, name: string, email: string) {
        this.id = id
        this.name = name
        this.email = email
    }
}