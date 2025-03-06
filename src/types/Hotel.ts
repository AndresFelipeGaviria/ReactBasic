import { Room } from ".";

export interface HotelResponse {
    hotelId:      string;
    name:         string;
    address:      string;
    isActive:     boolean;
    createdAt:    string;
    city:         string;
    updatedAt:    null | string;
    rooms:        Room[];
    reservations: any[];
}

export interface CreateHotel{
    name:     string;
    address:  string;
    isActive: boolean;
}