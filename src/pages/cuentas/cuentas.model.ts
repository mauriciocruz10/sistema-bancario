export interface Cuenta {
    id:string;
    name:string;
    type:string;
    userId:string;
    deposits:number;
    withdrawals:number;
    balance:number;
}

export interface Tarjeta {
    type:string;
    name:string;
}