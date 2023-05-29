import {IUser} from "./user";


export interface IProduct {
    id: string;
    photos: string;
    //ownerId: Pick<IUser, "id">;
    title: string;
    price: string;
    description: string;
    location: string;
    createdAt: string;
    saved: boolean;
}