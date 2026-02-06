import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Layout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 font-sans">

            <header className="bg-stone-800 text-stone-200 shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold tracking-wider text-amber-500 hover:text-amber-400 transition">
                        🅿️ PARKA
                    </Link>
                    <nav className="flex gap-6 font-medium text-sm">
                        {token ? (
                            <>
                                <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
                                <Link to="/my-bookings" className="hover:text-white transition">Οι Κρατήσεις μου</Link>
                                <button onClick={logout} className="text-red-300 hover:text-red-200 transition">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="bg-amber-700 px-4 py-2 rounded text-white hover:bg-amber-600 transition">Σύνδεση</Link>
                                <Link to="/signup" className="bg-amber-700 px-4 py-2 rounded text-white hover:bg-amber-600 transition">
                                    Εγγραφή
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>


            <main className="flex-grow p-6 flex flex-col items-center justify-start w-full">
                {/* WELCOME MESSAGE */}
                {token && username && (
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-light text-stone-600">
                            Καλωσήρθες, <span className="font-bold text-sky-700">{username}</span>! 👋
                        </h1>
                    </div>
                )}
                {children}
            </main>
            <footer className="bg-stone-900 text-stone-500 py-6 text-center text-sm">
                <p> 2026 Parka App. Simple & Smart Parking. All Rights Reserved</p>
            </footer>
        </div>
    );
}