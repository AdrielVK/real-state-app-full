export interface User {
    email:string
    name:string
    lastname:string
    role: 'DEFAULT' | 'ADMIN' | 'COLLABORATOR'
    phoneNumber?: string
    profilePic?: string
    disclaimer?: string
    biography?: string
}

export interface ResponseLogin {
    access_token:string
    user:User
}