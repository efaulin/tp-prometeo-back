import { ObjectId } from "mongodb";

export class Usuario{
    constructor(
        public usuario:string,
        public contra:string,
        public email:string,
        public tipo:string,
        public _id?:ObjectId
    ) {};
};
