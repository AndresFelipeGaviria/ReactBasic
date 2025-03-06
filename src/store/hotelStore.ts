import { create } from 'zustand';
import {  HotelResponse } from '../types/Hotel';
import { Hotel, Reservation, Room, UpdateHotel } from '../types';
import {createHotel, getHotelById, getHotels, updatedHotelId} from '../services/hotelsManagement.service';
import { createRoom, updatedRoomId } from '../services/room.service';


type HotelStore = {
  hotels: HotelResponse[] | null;
  hotel: HotelResponse | null;
  loading: boolean;
  error: string | null;
  reservations: Reservation[];
  addHotel: (hotel: Omit<Hotel, 'hotelId' | 'rooms'>) => void;
  getHotels: () => void;
  getHotelById: (id: string) => void;
  updateHotel: (id: string, updatedHotel: UpdateHotel) => void;
  toggleHotelStatus: (id: string) => void;
  addRoom: (hotelId: string, room: Omit<Room, 'roomId'>) => void;
  updateRoom: (roomId: string, updatedRoom: Omit<Room, 'roomId'>) => void;
  toggleRoomStatus: (hotelId: string, roomId: string) => void;
};

const useHotelStore = create<HotelStore>((set) => ({
    hotels: [],
    hotel: null,
    loading: false,
    error: null,
    reservations: [],

  addHotel: async(hotel) =>{
    try{
        await createHotel(hotel);
        set({ loading: false, error: null });
    }catch(err) {
        console.error(err);
        set({ loading: false, error: "Erro en el servicio" });
    }
  },
   
  getHotels: async() =>{
    set({ hotels: null, loading: false, error: null });
    try{
       const hotels = await getHotels();
        set({ hotels, loading: false, error: null });
    }catch(err) {
        console.error(err);
        set({ loading: false, error: "Erro en el servicio" });
    }
  },

  getHotelById: async(id: string) =>{
    set({ hotel: null, loading: false, error: null });
    try{
       const hotel = await getHotelById(id);
        set({ hotel, loading: false, error: null });
    }catch(err) {
        console.error(err);
        set({ loading: false, error: "Erro en el servicio" });
    }
  },

  updateHotel: async(id, updatedHotel) =>{
    try{
         await updatedHotelId(id, updatedHotel);
         set({loading: false, error: null });
     }catch(err) {
         console.error(err);
         set({ loading: false, error: "Erro en el servicio" });
     }
  },
 
  toggleHotelStatus: (id) =>{},
    

  addRoom: async(hotelId, room) =>{
    try{
         await createRoom(hotelId, room);
         set({loading: false, error: null });
     }catch(err) {
         console.error(err);
         set({ loading: false, error: "Erro en el servicio" });
     }
  },
    

  updateRoom: async(roomId, updatedRoom) =>{
    try{
         await updatedRoomId(roomId, updatedRoom);
         set({loading: false, error: null });
     }catch(err) {
         console.error(err);
         set({ loading: false, error: "Erro en el servicio" });
     }
  },
   
  toggleRoomStatus: (hotelId, roomId) =>{},
   
}));

export default useHotelStore;