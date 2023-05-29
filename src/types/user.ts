import {IProduct} from "./product";


export interface IUser {
    id: string;
    fullName: string;
    location?: string;
    avatar?: string;
    phone: string | null;
    createdAt: number;
    updatedAt: number | null;
    email: string;
    product?: IProduct[];
}