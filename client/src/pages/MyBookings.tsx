import  { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

interface Booking {
    _id: string;
    place: { address: string; price: number };
    startTimestamp: string;
    endTimestamp: string;
    totalPrice: number;
    status: string;
}

export default function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const fetchBookings = async () => {
        try {
            const res = await api.get('/booking/my-bookings');
            console.log("ΔΕΔΟΜΕΝΑ:", res.data);
            setBookings(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <Layout>
            <div className="w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-stone-800 border-b pb-2">
                     Οι Κρατήσεις μου
                </h2>

                {bookings.length === 0 ? (
                    <p className="text-stone-500 text-lg">Δεν έχεις κάνει καμία κράτηση ακόμα.</p>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => {

                            if (!booking.place || !booking.startTimestamp) {
                                return (
                                    <div key={booking._id} className="bg-red-50 p-4 rounded text-red-500 border border-red-200">
                                    </div>
                                )
                            }
                            return (
                                <div key={booking._id} className="bg-white p-6 rounded-xl shadow border border-stone-200 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-xl text-stone-800">
                                             {booking.place.address}
                                        </h3>
                                        <p className="text-stone-500 mt-1">
                                             {new Date(booking.startTimestamp).toLocaleString()}
                                        </p>
                                        <span className="text-xs font-bold uppercase px-2 py-1 rounded mt-2 inline-block bg-green-100 text-green-800">
                        {booking.status}
                      </span>
                                    </div>
                                    <div className="text-right">
                      <span className="block text-2xl font-bold text-sky-700">
                        {booking.totalPrice}€
                      </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
}