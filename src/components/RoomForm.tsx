import React, { useState } from 'react';
import { Room } from '../types';

type RoomFormProps = {
  initialData?: Room;
  onSubmit: (room: Room) => void;
  onClose: () => void;
};

const RoomForm = ({ initialData, onSubmit, onClose }: RoomFormProps) => {
  const [type, setType] = useState(initialData?.roomType ?? '');
  const [roomId ] = useState(initialData?.roomId ?? '');
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [capacity, setCapacity] = useState(initialData?.capacity);
  const [baseCost, setBaseCost] = useState(initialData?.baseCost || 0);
  const [taxes, setTaxes] = useState(initialData?.taxes || 0);
  const [enabled, setEnabled] = useState(initialData?.isAvailable ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ roomId: roomId, capacity:capacity ?? 0, roomType: type, baseCost, taxes, isAvailable: enabled, location });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {initialData ? 'Editar Habitación' : 'Agregar Habitación'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">capacidad</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ubicación</label>
            <input
              type="string"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Costo Base</label>
            <input
              type="number"
              value={baseCost}
              onChange={(e) => setBaseCost(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Impuestos</label>
            <input
              type="number"
              value={taxes}
              onChange={(e) => setTaxes(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="mr-2"
              />
              Habilitada
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {initialData ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;