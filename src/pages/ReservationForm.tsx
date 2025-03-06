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
    await createReservation(reservationData);
    navigate(`/hotels/${hotelId}`); 
  };

  if (!hotel || !room) {
    return <div>Hotel o habitación no encontrada</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Reservar Habitación</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{hotel.name}</h2>
          <p className="text-gray-600">{room.roomType} - ${room.baseCost + room.taxes} por noche</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-In</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Huéspedes</label>
            <input
              type="number"
              value={totalGuests}
              onChange={(e) => setTotalGuests(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg"
              min="1"
              required
            />
          </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Viajero Principal</h3>
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;