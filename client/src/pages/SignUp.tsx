import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const registerSchema = z.object({
    username: z.string().min(3, "Τουλάχιστον 3 χαρακτήρες"),
    email: z.string().email("Μη έγκυρο email"),
    password: z.string().min(6, "Τουλάχιστον 6 χαρακτήρες"),
    role: z.enum(["driver", "owner"]),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        try {
            await api.post('/auth/register', data);
            navigate('/login');
        } catch (error) {
            const err = error as any;
            alert(err.response?.data?.error || 'Σφάλμα εγγραφής');
        }
    };

    return (
        <Layout>
            <div className="w-full max-w-md bg-sky-50 p-8 rounded-xl shadow-lg border border-sky-200 mt-6">
                <h2 className="text-3xl font-bold text-center text-sky-900 mb-6">Εγγραφή</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-stone-700">Username</label>
                        <input
                            {...register("username")}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                        />
                        {errors.username && <p className="text-red-600 text-xs mt-1 font-bold">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-stone-700">Email</label>
                        <input
                            {...register("email")}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1 font-bold">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-stone-700">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                        />
                        {errors.password && <p className="text-red-600 text-xs mt-1 font-bold">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-stone-700">Ρόλος</label>
                        <select
                            {...register("role")}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-stone-700"
                        >
                            <option value="driver"> Οδηγός</option>
                            <option value="owner"> Ιδιοκτήτης</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-stone-700 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition shadow-md">
                        Δημιουργία Λογαριασμού
                    </button>
                </form>

                <p className="text-center mt-6 text-stone-600 text-sm">
                    Έχεις λογαριασμό; <Link to="/login" className="text-sky-700 font-bold hover:underline">Σύνδεση</Link>
                </p>
            </div>
        </Layout>
    );
}