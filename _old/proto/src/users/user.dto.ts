
export interface UserDTO {
    username: string;
}

export interface CreateUserDTO extends UserDTO {
    password: string;
}

export interface UserWithIdDTO extends UserDTO {
    id: string;
}


