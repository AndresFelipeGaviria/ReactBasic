import api from "./api";
import { API_SERVICES } from "../utils/constants";


export const getAllReservations = async (): Promise<any> => {
      const  data  = await api.get(API_SERVICES.RESERVATIONS.GET_RESERVATIONS);
      return data.data ; 
}

