import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import axios from 'axios';
import Layout from '../components/Layout';

interface Spot {
    _id: string;
    address: string;
    price: number;
    description: string;
    owner?: { username: string };
}

export default function Dashboard() {
    const role = localStorage.getItem('role');
    const [spots, setSpots] = useState<Spot[]>([]);


    const [newSpot, setNewSpot] = useState({ address: '', price: 5.0, description: '' });

    const fetchSpots = async () => {
        try {
            const res = await api.get('/park');
            setSpots(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSpots();
    }, []);

    const handleCreateSpot = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/park', newSpot);
            alert('Η θέση προστέθηκε!');
            setNewSpot({ address: '', price: 5.0, description: '' });
            fetchSpots();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.error || error.message);
            } else {
                alert('Σφάλμα προσθήκης');
            }
        }
    };

    const handleBookSpot = async (spotId: string) => {
        try {
            const startTime = new Date();
            const endTime = new Date();
            endTime.setHours(startTime.getHours() + 2);

            await api.post('/booking', {
                spotId,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString()
            });
            alert('Η θέση κρατήθηκε επιτυχώς για 2 ώρες!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.error || 'Αποτυχία κράτησης');
            }
        }
    };

    return (
        <Layout>
            <div className="w-full max-w-6xl">
                <h2 className="text-3xl font-bold mb-8 text-stone-800 border-b-2 border-stone-200 pb-2">
                    {role === 'owner' ? ' Διαχείριση Θέσεων' : ' Εύρεση Πάρκινγκ'}
                </h2>

                {role === 'owner' && (
                    <div className="bg-sky-50 p-6 rounded-xl border border-sky-200 shadow-sm mb-10">
                        <h3 className="font-bold text-xl text-sky-900 mb-4"> Νέα Θέση</h3>
                        <form onSubmit={handleCreateSpot} className="grid md:grid-cols-4 gap-4">
                            <input
                                placeholder="Διεύθυνση"
                                className="col-span-2 p-3 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={newSpot.address}
                                onChange={e => setNewSpot({...newSpot, address: e.target.value})}
                                required
                            />

                            {/* <--- ΑΛΛΑΓΗ 3: Input για price */}
                            <input
                                type="number" step="0.5" placeholder="Τιμή"
                                className="p-3 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={newSpot.price}
                                onChange={e => setNewSpot({...newSpot, price: parseFloat(e.target.value)})}
                                required
                            />

                            <button className="bg-sky-700 text-white font-bold py-3 rounded-lg hover:bg-sky-800 transition shadow-md">
                                Προσθήκη
                            </button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {spots.map((spot) => (
                        <div key={spot._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition border border-stone-200 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg text-stone-800">{spot.address}</h4>
                                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                    {spot.price}€ / ώρα  {}
                  </span>
                                </div>
                                <p className="text-stone-500 text-sm mb-4">{spot.description || 'Διαθέσιμη θέση.'}</p>
                                <p className="text-stone-400 text-xs italic">Owner: {spot.owner?.username || 'Άγνωστος'}</p>
                            </div>

                            {role === 'driver' && (
                                <button
                                    onClick={() => handleBookSpot(spot._id)}
                                    className="w-full mt-4 bg-stone-700 text-white py-2 rounded-lg font-medium hover:bg-stone-800 transition"
                                >
                                    Κράτηση Τώρα
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}