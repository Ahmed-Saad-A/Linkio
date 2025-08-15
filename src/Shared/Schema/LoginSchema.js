import * as zod from 'zod';



export const LoginSchema = zod.object({
    email: zod.string()
    .nonempty('E-mail; is required')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'E-mail is invalid'),

    password: zod.string()
    .nonempty('Password is requied')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, 'Password must contain at least one letter, one number and one special character'),
})