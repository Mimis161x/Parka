import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const loginSchema = z.object({
    email: z.string().email("Μη έγκυρο email"),
    password: z.string().min(1, "Βάλε κωδικό"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await api.post('/auth/login', data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('username', res.data.user.username);
            navigate('/dashboard');
        } catch (error) {
            const err = error as any;
            alert(err.response?.data?.error || 'Λάθος στοιχεία');
        }
    };

    return (
        <Layout>
            <div className="w-full max-w-md bg-sky-50 p-8 rounded-xl shadow-lg border border-sky-200 mt-10">
                <h2 className="text-3xl font-bold text-center text-sky-900 mb-6">Σύνδεση</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-stone-700">Email</label>
                        <input
                            {...register("email")}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1 font-bold">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-stone-700">Κωδικός</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                        />
                        {errors.password && <p className="text-red-600 text-xs mt-1 font-bold">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-stone-700 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition shadow-md">
                        Είσοδος
                    </button>
                </form>

                <p className="text-center mt-6 text-stone-600 text-sm">
                    Δεν έχεις γραφτεί ακόμη; <Link to="/signup" className="text-sky-700 font-bold hover:underline">Εγγραφή</Link>
                </p>
            </div>
        </Layout>
    ); }