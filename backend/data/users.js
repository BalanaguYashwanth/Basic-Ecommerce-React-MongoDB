import bcrypt from "bcryptjs"

const user=[
    {
        name:'Admin user',
        email:'admin@yashmerce.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'John',
        email:'john@yashmerce.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'Jane',
        email:'jane@yashmerce.com',
        password:bcrypt.hashSync('123456',10),
    },
]

export default user
