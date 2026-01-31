import UserSchema from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {z} from "zod";

export const  SignupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]).optional()
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export class AuthService {
    async register(data: z.infer<typeof SignupSchema>) {
        const existingUser = await UserSchema.findOne({ email: data.email } as any);
        if (existingUser) throw new Error("Το email χρησιμοποείται");

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await UserSchema.create({ ...data, password: hashedPassword } as any);

        return { id: user._id, email: user.email, role: user.role };
    }

    async login(data: z.infer<typeof LoginSchema>) {
        const user = await UserSchema.findOne({ email: data.email } as any);
        if (!user) throw new Error("Λάθος credentials.");

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) throw new Error("Λάθος credentials.");

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        return { token, user: { id: user._id, username: user.username, role: user.role } };
    }
}