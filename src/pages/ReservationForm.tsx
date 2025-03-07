import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useHotelStore from "../store/hotelStore";
import { ReservationRequest, Guest } from "../types"; 
import useUserStore from "../store/userStore";

const ReservationForm = () => {
  const { hotelId, roomId } = useParams();
  const { hotel } = useHotelStore();
  const { createReservation } = useUserStore();
  const navigate = useNavigate();


  const room = hotel?.rooms.find((r) => r.roomId === roomId);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalGuests, setTotalGuests] = useState(1);
  const [traveler, setTraveler] = useState({
    fullName: "",
    email: "",
    documentType: "",
    documentNumber: "",
    phoneNumber: "",
  });
  const [emergencyContact, setEmergencyContact] = useState({ fullName: "", phone: "" });
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    const newGuests = Array.from({ length: totalGuests }, () => ({
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      documentType: "",
      documentNumber: "",
    }));
    setGuests(newGuests);
  }, [totalGuests]);

  const handleGuestChange = (index: number, field: keyof Guest, value: string) => {
    const newGuests = [...guests];
    newGuests[index][field] = value;
    setGuests(newGuests);
  };

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reservationData: ReservationRequest = {
      hotelId: hotelId!,
      roomId: roomId!,
      checkInDate: new Date(checkInDate).toISOString(),
      checkOutDate: new Date(checkOutDate).toISOString(),
      totalGuests,
      traveler,
      emergencyContact,
      guests,
    };
    try {
      await createReservation(reservationData);
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate(`/hotels/${hotelId}`);
      }, 3000);
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };
  
  if (!hotel || !room) {
    return <div>Hotel o habitación no encontrada</div>;
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
  };

  
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Reservar Habitación</h1>

        <div className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">{hotel?.name}</h2>
          <p className="text-blue-600 text-lg">
            {room?.roomType} - {formatPrice(room?.baseCost + room?.taxes)} por noche
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-In</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-Out</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

        
          <div className="p-6 bg-gray-50 rounded-xl">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Huéspedes</label>
            <input
              type="number"
              value={totalGuests}
              onChange={(e) => setTotalGuests(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              min="1"
              max={room.capacity}
              required
            />
          </div>

         
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Viajero Principal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={traveler.fullName}
                  onChange={(e) => setTraveler({ ...traveler, fullName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={traveler.email}
                  onChange={(e) => setTraveler({ ...traveler, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
                <input
                  type="text"
                  value={traveler.documentType}
                  onChange={(e) => setTraveler({ ...traveler, documentType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Documento</label>
                <input
                  type="text"
                  value={traveler.documentNumber}
                  onChange={(e) => setTraveler({ ...traveler, documentNumber: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numero de Telefono</label>
                <input
                  type="text"
                  value={traveler.phoneNumber}
                  onChange={(e) => setTraveler({ ...traveler, phoneNumber: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
          

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contacto de Emergencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={emergencyContact.fullName}
                  onChange={(e) => setEmergencyContact({ ...emergencyContact, fullName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={emergencyContact.phone}
                  onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Huéspedes</h3>
            {guests.map((guest, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Huésped {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={guest.firstName}
                      onChange={(e) => handleGuestChange(index, "firstName", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input
                      type="text"
                      value={guest.lastName}
                      onChange={(e) => handleGuestChange(index, "lastName", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      value={guest.birthDate}
                      onChange={(e) => handleGuestChange(index, "birthDate", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                    <input
                      type="text"
                      value={guest.gender}
                      onChange={(e) => handleGuestChange(index, "gender", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
                    <input
                      type="text"
                      value={guest.documentType}
                      onChange={(e) => handleGuestChange(index, "documentType", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Documento</label>
                    <input
                      type="text"
                      value={guest.documentNumber}
                      onChange={(e) => handleGuestChange(index, "documentNumber", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            Confirmar Reserva
          </button>
        </form>
        {showSnackbar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 transform animate-fadeIn">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">¡Reserva Confirmada!</h3>
                <p className="mt-2 text-gray-600">
                  Su reserva ha sido creada exitosamente. Será redirigido en breve.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;