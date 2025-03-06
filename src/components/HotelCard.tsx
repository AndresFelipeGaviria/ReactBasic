import React from "react";
import { Room } from '../types';
import { HotelResponse } from '../types/Hotel';

type HotelCardProps = {
  hotel: HotelResponse;
  onEdit: () => void;
  onToggleStatus: () => void;
  onAddRoom: () => void;
  onEditRoom: (room: Room) => void;
  onToggleRoomStatus: (roomId: string) => void;
};

const HotelCard = ({
  hotel,
  onEdit,
  onToggleStatus,
  onAddRoom,
  onEditRoom,
  onToggleRoomStatus,
}: HotelCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
      <p className="text-gray-600 mt-2">{hotel.address}</p>
      <p className={`text-sm mt-2 ${hotel.isActive ? 'text-green-600' : 'text-red-600'}`}>
        {hotel.isActive ? 'Habilitado' : 'Deshabilitado'}
      </p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition duration-200"
        >
          Editar
        </button>
        <button
          onClick={onToggleStatus}
          className={`${
            hotel.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white px-3 py-1 rounded-lg transition duration-200`}
        >
          {hotel.isActive ? 'Deshabilitar' : 'Habilitar'}
        </button>
        <button
          onClick={onAddRoom}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition duration-200"
        >
          Agregar Habitación
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Habitaciones</h3>
        <div className="mt-2 overflow-y-auto max-h-96"> 
        {hotel.rooms.map((room: Room) => (
          <div key={room.roomId} className="mt-2 p-2 border border-gray-200 rounded-lg">
            <p className="text-gray-700">
              {room.roomType} - ${room.baseCost + room.taxes} ({room.isAvailable ? 'Habilitada' : 'Deshabilitada'})
            </p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => onEditRoom(room)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg transition duration-200"
              >
                Editar
              </button>
              <button
                onClick={() => onToggleRoomStatus(room.roomId)}
                className={`${
                  room.isAvailable ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white px-2 py-1 rounded-lg transition duration-200`}
              >
                {room.isAvailable ? 'Deshabilitar' : 'Habilitar'}
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default HotelCard;