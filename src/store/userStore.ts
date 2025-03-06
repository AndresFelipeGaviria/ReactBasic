import { create } from 'zustand';
import { HotelResponse } from '../types/Hotel';
import { createReservation, searchHotels } from '../services/hotel.service';
import { ReservationRequest, SearchHotels } from '../types';

type UserStore = {
  filteredHotels: HotelResponse[] | null;
  loading: boolean;
  error: string | null;
  searchHotels: (filters: SearchHotels) => Promise<void>; 
  createReservation: ( reservation: ReservationRequest ) => void;
};

const useUserStore = create<UserStore>((set) => ({
  filters: {
    checkIn: "",
    checkOut: "",
    guests: 1,
    city: "",
  },
  filteredHotels: null,
  loading: false,
  error: null,

  searchHotels: async (filter: SearchHotels) => {
    set({ loading: true, error: null });
    try {
     
      const filteredHotels = await searchHotels(filter);

      set({ filteredHotels, loading: false, error: null });
    } catch (err) {
      console.error(err);
      set({ loading: false, error: "Error al buscar hoteles" });
    }
  },

  createReservation: async ( reservation: ReservationRequest ) => {
    try {
      await createReservation( reservation );
      set({ loading: false, error: null });
    } catch (err) {
      console.error(err);
      set({ loading: false, error: "Error al reservar hotel" });
    }
  }
}));

export default useUserStore;