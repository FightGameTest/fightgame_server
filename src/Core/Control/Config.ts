class Config {
    constructor() {

    }

    get POSTMAN() {
        return {
            FIND_ROOM: "find_room",
            FIND_SOCKET: "find_socket",
            GET_EMPTY_ROOMS: "get_empty_rooms",
            ADD_ROOM: "add_room"
        }
    }
}

export default Config;