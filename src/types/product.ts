

export interface IProduct {
    id: number;
    photos: string;
    ownerId: number
    title: string;
    price: number;
    description: string;
    location: string;
    createdAt: string;
    saved: boolean;
}