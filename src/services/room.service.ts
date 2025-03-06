import api from "./api";
import { API_SERVICES } from "../utils/constants";
import { Room } from '../types/index';


export const createRoom = async (hotelId: string, room: Omit<Room, 'roomId'>): Promise<any> => {
    try {
      const  data  = await api.post(API_SERVICES.ROOMS.CREATE_ROOM(hotelId), room );
      return data.data ;
    } catch (error) {
      throw error;
    }
}

export const updatedRoomId = async (roomId: string, room: Omit<Room, 'roomId'>): Promise<any> => {
    try {
      const  data  = await api.put(API_SERVICES.ROOMS.UPDATE_ROOM(roomId), room );
      return data.data ;
    } catch (error) {
      throw error;
    }
}


