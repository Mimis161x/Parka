
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Home() {
    const token = localStorage.getItem('token');

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-full text-center mt-20">
                <h1 className="text-5xl font-extrabold text-stone-800 mb-6 leading-tight">
                    Έχεις πρόβλημα με το parking; <br />
                    <span className="text-amber-600">Είμαστε εδώ για σένα!</span>
                </h1>

                <p className="text-xl text-stone-600 mb-10 max-w-2xl">
                    Βρες θέση γρήγορα ή νοίκιασε τη δική σου και κέρδισε χρήματα.
                    Απλά, έξυπνα και με ασφάλεια.
                </p>

                {!token ? (
                    <div className="flex gap-4">
                        <Link to="/login" className="bg-stone-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-stone-700 transition shadow-lg">
                            Σύνδεση
                        </Link>
                        <Link to="/signup" className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-500 transition shadow-lg">
                            Εγγραφή
                        </Link>
                    </div>
                ) : (
                    <div className="mt-4">
                        <Link to="/dashboard" className="bg-sky-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-sky-600 transition shadow-lg">
                            Βρες Πάρκινγκ Τώρα
                        </Link>
                    </div>
                )}
            </div>
        </Layout>
    );
}