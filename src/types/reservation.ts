export interface ReservationResponse {
    hotelId: string;
    name: string;
    reservations: Reservation[];
  }
  
  export interface Reservation {
    reservationId: string;
    hotelId: string;
    hotelName: string | null;
    roomId: string;
    roomType: string;
    checkInDate: string;
    checkOutDate: string; 
    totalGuests: number;
    emergencyContact: EmergencyContact;
    traveler: Traveler;
    room: Room;
  }
  
  export interface EmergencyContact {
    emergencyContactId: string;
    fullName: string;
    phone: string;
  }
  
  export interface Traveler {
    fullName: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phoneNumber: string;
  }
  
  export interface Room {
    roomId: string;
    roomType: string;
    baseCost: number;
    taxes: number;
    isAvailable: boolean;
    location: string;
    capacity: number;
  }