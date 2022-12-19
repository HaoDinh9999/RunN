export interface User {
    _id: string;
    name: string;
    email: string;
    addressWallet ?: string;
    signer ?:any;
    sneakers?:any;
}