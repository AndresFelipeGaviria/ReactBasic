import React,{ useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from '../store/userStore';

const HotelSearch = () => {
    const { searchHotels, filteredHotels } = useUserStore();

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [city, setCity] = useState("");

    const handleSearch = () => {
        const params = {
            ...(checkIn ? { checkIn } : null),
            ...(checkOut ? { checkOut } : null),
            ...(guests > 0 ? { guests } : null),
            ...(city ? { city } : null)
        };
    
        searchHotels(params); 
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto relative">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    Encuentra tu hotel ideal
                </h1>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-gray-700 font-medium">Fecha de entrada</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-700 font-medium">Fecha de salida</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-700 font-medium">Huéspedes</label>
                            <input
                                type="number"
                                min="1"
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-700 font-medium">Ciudad</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                placeholder="Ej: Barcelona"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
                        >
                            Buscar Hoteles
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredHotels?.map((hotel) => (
                        <div key={hotel.hotelId} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{hotel.name}</h2>
                                <p className="text-gray-600 mb-4">{hotel.address}</p>
                                <Link
                                    to={`/hotels/${hotel.hotelId}`}
                                    className="block w-full text-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
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