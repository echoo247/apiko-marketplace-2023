export interface IUser {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    createAt: string;
    location?: string;
    avatar?: string;
    productId?: string[];
}

export type Users = IUser[];