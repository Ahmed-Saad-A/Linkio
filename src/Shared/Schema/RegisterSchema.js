import * as zod from "zod";

export const RegisterSchema = zod.object({
  name: zod.string()
    .nonempty('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(20, 'Name must be at most 20 characters long'),

  email: zod.string()
    .nonempty('Email is required')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'E-mail is invalid'),

  password: zod.string()
    .nonempty('Password is required')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, 'Password must contain at least one letter, one number and one special character'),

  rePassword: zod.string()
    .nonempty('Confirm password is required'),

  dateOfBirth: zod.coerce.date()
    .refine((date) => {
        const birthDate = date.getFullYear();
        const nowDate = new Date().getFullYear();
        const age = nowDate - birthDate;

        return age >= 18;
    },
    {message: 'You must be at least 18 years old'}
),

  gender: zod.string()
    .nonempty('Gender is required')
    .regex(/^(male|female)$/, 'Enter valid gender')
}).refine((data) => data.password === data.rePassword, {
  message: 'Confirm password and password must be matched',
  path: ['rePassword']
});