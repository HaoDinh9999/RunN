export  interface PropSneaker {
    Condition: number;
    Durability: number;
    Joy: number;
    Level:{hex: string, type:string};
    Mint: number;
    Performance: number;
    Rarity: string;
    Type: string;
    id:{hex:string, type:string},
    price?: number;
    saleId?: string;
    seller?: string;
}