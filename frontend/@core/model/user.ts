import { PropSneaker } from "./sneaker";

export interface User {
    _id: string;
    name: string;
    email: string;
    addressWallet ?: string;
    signer ?:any;
    sneakers?:PropSneaker[];
    RMToken?:{hex:string, type:string};
}