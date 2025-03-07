import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from '../store/userStore';

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
];

const HotelSearch = () => {
    const { searchHotels, filteredHotels } = useUserStore();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [city, setCity] = useState("");

    const handleSearch = () => {
        const params = {
            ...(checkIn ? { checkIn } : {}),
            ...(checkOut ? { checkOut } : {}),
            ...(guests > 0 ? { guests } : {}),
            ...(city ? { city } : {})
        };
        searchHotels(params);
    };

    const getRandomImage = () => {
        return `${hotelImages[Math.floor(Math.random() * hotelImages.length)]}?auto=format&fit=crop&w=800&q=80`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold text-white mb-8 text-center">
                    Encuentra tu hotel ideal
                </h1>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-gray-700 font-medium">Fecha de entrada</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-700 font-medium">Fecha de salida</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-700 font-medium">Huéspedes</label>
                            <input
                                type="number"
                                min="1"
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-700 font-medium">Ciudad</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                placeholder="Ej: Barcelona"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleSearch}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                        >
                            Buscar Hoteles
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredHotels?.map((hotel) => (
                        <div key={hotel.hotelId} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                            <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                <img
                                    src={getRandomImage()}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h2 className="text-2xl font-bold text-white mb-2">{hotel.name}</h2>
                                    <div className="flex items-center text-white/90 gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-sm">{hotel.address}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <Link
                                    to={`/hotels/${hotel.hotelId}`}
                                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-xl"
                                >
                                    Ver Habitaciones
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelSearch;