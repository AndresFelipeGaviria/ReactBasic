import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useHotelStore from "../store/hotelStore";

const HotelDetails = () => {
  const { id } = useParams();
  const { hotel, getHotelById } = useHotelStore();

  useEffect(() => {
    if (id) {
      getHotelById(id);
    }
  }, [id, getHotelById]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{hotel?.name}</h1>
        <p className="text-gray-600 text-lg mb-4">{hotel?.address}</p>
        <p className="text-gray-700">
          <span className="font-semibold">Estado:</span>{" "}
          <span className={`${hotel?.isActive ? "text-green-600" : "text-red-600"}`}>
            {hotel?.isActive ? "Habilitado" : "Deshabilitado"}
          </span>
        </p>
      </div>


      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Habitaciones Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotel?.rooms.map((room) => (
            <div key={room.roomId} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
     
              <img
                src="https://via.placeholder.com/400x250" 
                alt={room.roomType}
                className="w-full h-48 object-cover"
              />


              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{room.roomType}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Precio:</span> ${room.baseCost + room.taxes} por noche
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Ubicación:</span> {room.location}
                </p>

      
                <Link
                  to={`/reservations/${hotel.hotelId}/${room.roomId}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Reservar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;