export interface registerPayload {
    email: string,
    password: string,
}

export interface RegisterResponce {
    idtoken: string,
    email: string,
    refreshToken: string,
    expiresIn: "3600",
    localId: ''
}