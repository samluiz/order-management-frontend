export interface UserInfo {
    id: string
    username: string
    roles: Role[]
}

export enum Role {
    admin = "ROLE_ADMIN",
    viewer = "ROLE_VIEWER",
    editor = "ROLE_EDITOR",
}