import React, { useEffect } from "react";
import { Reservation } from "../types/reservation";
import useReservationStore from "../store/reservationStore";

const ReservationsList = () => {
  const { reservations, getReservations } = useReservationStore();

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Mis Reservaciones
        </h1>

        {reservations?.map((hotel) => (
          <div key={hotel.hotelId} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-2 bg-blue-600 rounded-full" />
              <h2 className="text-3xl font-bold text-gray-800">{hotel.name}</h2>
            </div>

            {hotel.reservations.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-600 text-lg">No hay reservas en este hotel.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {hotel?.reservations.map((reservation: Reservation) => (
                  <div 
                    key={reservation.reservationId} 
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {reservation.roomType}
                      </h3>
                      <p className="text-blue-100">
                        {reservation.room.location}
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm text-blue-600 font-medium">Check-In</p>
                          <p className="text-gray-800 font-semibold">
                            {new Date(reservation.checkInDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm text-blue-600 font-medium">Check-Out</p>
                          <p className="text-gray-800 font-semibold">
                            {new Date(reservation.checkOutDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-6">
                        <div>
                          <p className="text-sm text-gray-600">Costo Total</p>
                          <p className="text-xl font-bold text-gray-800">
                            {formatPrice(reservation.room.baseCost + reservation.room.taxes)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Huéspedes</p>
                          <p className="text-xl font-bold text-gray-800 text-center">
                            {reservation.totalGuests}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="border-l-4 border-blue-600 pl-4">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Viajero Principal</h4>
                          <div className="space-y-1 text-gray-600">
                            <p>{reservation.traveler.fullName}</p>
                            <p className="text-blue-600">{reservation.traveler.email}</p>
                            <p>{reservation.traveler.phoneNumber}</p>
                          </div>
                        </div>

                        <div className="border-l-4 border-indigo-600 pl-4">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Contacto de Emergencia</h4>
                          <div className="space-y-1 text-gray-600">
                            <p>{reservation.emergencyContact.fullName}</p>
                            <p>{reservation.emergencyContact.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsList;