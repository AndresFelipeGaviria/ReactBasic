export const API_SERVICES = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    HOTELS: {
        GET_HOTELS: '/hotel/all',
        GET_HOTEL: (id: string) => `/hotel/${id}`,
        CREATE_HOTEL: '/hotel',
        UPDATE_HOTEL: (id: string) =>  `/hotel/${id}`,
        DELETE_HOTEL: '/hotel/:id',
    },
    ROOMS: {
        CREATE_ROOM: (idHotel: string) => `/room/${idHotel}`,
        UPDATE_ROOM: (idRoom: string) =>  `/room/${idRoom}`,
    },
    USER_SEARCH: {
        HOTEL: '/hotel-search/search',
        RESERVATION: '/hotel-search/reserve',
    },
    RESERVATIONS: {
        GET_RESERVATIONS: '/hotel/with-reservations',
    },
}