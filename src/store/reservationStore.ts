import { create } from 'zustand';
import { getAllReservations } from '../services/reservation.service';
import {  ReservationResponse } from '../types/reservation';

type UserStore = {
  reservations: ReservationResponse[] | null;
  loading: boolean;
  error: string | null;
  getReservations: () => Promise<void>; 

};

const useReservationStore = create<UserStore>((set) => ({
  reservations: null,
  filteredHotels: null,
  loading: false,
  error: null,

  getReservations: async () => {
    set({ loading: true, error: null });
    try {
     
      const reservations = await getAllReservations();

      set({ reservations, loading: false, error: null });
    } catch (err) {
      console.error(err);
      set({ loading: false, error: "Error al buscar hoteles" });
    }
  },

 
}));

export default useReservationStore;