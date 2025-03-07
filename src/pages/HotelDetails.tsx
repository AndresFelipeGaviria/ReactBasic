import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useHotelStore from "../store/hotelStore";

const roomImages = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1474&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1474&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1470&auto=format&fit=crop"
];

const HotelDetails = () => {
  const { id } = useParams();
  const { hotel, getHotelById } = useHotelStore();

  useEffect(() => {
    if (id) {
      getHotelById(id);
    }
  }, [id, getHotelById]);
  
  const getRandomImage = () => {
    return roomImages[Math.floor(Math.random() * roomImages.length)];
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
   
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4">{hotel?.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 text-lg mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>{hotel?.address}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`inline-flex items-center px-4 py-2 rounded-full ${
                hotel?.isActive 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
              } font-semibold text-sm`}>
                {hotel?.isActive ? "Hotel Activo" : "Hotel Inactivo"}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-8">Habitaciones Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotel?.rooms.map((room) => (
              <div key={room.roomId} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img
                    src={getRandomImage()}
                    alt={room.roomType}
                    className="w-full h-56 object-cover hover:opacity-90 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    {formatPrice(room.baseCost + room.taxes)}/noche
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{room.roomType}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{room.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span>Capacidad: {room.capacity} personas</span>
                    </div>
                  </div>

                  <Link
                    to={`/reservations/${hotel?.hotelId}/${room.roomId}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    Reservar Ahora
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;