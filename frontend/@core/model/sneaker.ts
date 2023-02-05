export  interface PropSneaker {
    condition: number;
    durability: number;
    joy: number;
    level:{hex: string, type:string};
    mint: number;
    performance: number;
    rarity: string;
    type: string;
    id:{hex:string, type:string},
    price?: number;
    saleId?: string;
    seller?: string;
    imgUrl?:string;
}