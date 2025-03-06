import { ReservationRequest, SearchHotels } from "../types";
import { API_SERVICES } from "../utils/constants";
import api from "./api";

export const searchHotels = async (filters: SearchHotels | null): Promise<any> => {
    const response = await api.get(
        API_SERVICES.USER_SEARCH.HOTEL,
        filters ? { params: filters } : undefined
    );
    return response.data;
};
  

export const createReservation = async (reservation: ReservationRequest): Promise<any> => {
    try {
      const  data  = await api.post(API_SERVICES.USER_SEARCH.RESERVATION,  reservation);
      return data.data ;
    } catch (error) {
      throw error;
    }
}

