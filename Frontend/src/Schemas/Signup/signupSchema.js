import { object, string, number, date, } from 'yup';


let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

let userSchema = object({
    name: string().min(5).max(30).required(),
    email: string().email().required(),
    password: string().min(8).max(35).required()
    .matches(passwordPattern,
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number"
    ),
    
})

export default userSchema;