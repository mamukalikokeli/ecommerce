export interface AuthPayload {
    email: string,
    password: string,
}

export interface AuthResponce {
    idtoken: string,
    email: string,
    refreshToken: string,
    expiresIn: "3600",
    localId: string,
    displayName?: string,
    registered?: boolean
}