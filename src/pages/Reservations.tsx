import React, {useEffect} from "react";
import { Reservation } from "../types/reservation";
import useReservationStore from "../store/reservationStore";

const ReservationsList = () => {

  const {reservations, getReservations } = useReservationStore();

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Reservas</h1>

        {reservations?.map((hotel) => (
          <div key={hotel.hotelId} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{hotel.name}</h2>

            {hotel.reservations.length === 0 ? (
              <p className="text-gray-600">No hay reservas en este hotel.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotel?.reservations.map((reservation: Reservation) => (
                  <div key={reservation.reservationId} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{reservation.roomType}</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Check-In:</span> {new Date(reservation.checkInDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Check-Out:</span> {new Date(reservation.checkOutDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Huéspedes:</span> {reservation.totalGuests}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Ubicación:</span> {reservation.room.location}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Costo:</span> ${reservation.room.baseCost + reservation.room.taxes}
                    </p>

          
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Viajero</h4>
                      <p className="text-gray-600">{reservation.traveler.fullName}</p>
                      <p className="text-gray-600">{reservation.traveler.email}</p>
                      <p className="text-gray-600">{reservation.traveler.phoneNumber}</p>
                    </div>

              
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Contacto de Emergencia</h4>
                      <p className="text-gray-600">{reservation.emergencyContact.fullName}</p>
                      <p className="text-gray-600">{reservation.emergencyContact.phone}</p>
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