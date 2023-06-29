export interface IProduct {
    id: string;
    photos: string;
    ownerId: string
    title: string;
    price: number;
    description: string;
    location: string;
    createdAt: string;
    saved: boolean;
}

export type Products = IProduct[];