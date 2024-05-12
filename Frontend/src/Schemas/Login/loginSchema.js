import { object, string, number, date } from 'yup';



let userSchema = object({
    email: string().email('Enter valid email').required(),
    password: string().min(8).max(35).required()
    
})

export default userSchema;