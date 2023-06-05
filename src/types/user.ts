
export interface IUser {
    id: number;
    email: string;
    fullName: string;
    phone?: string;
    createdAt: string;
    location?: string;
    avatar?: string;
    productId?: number[];
}