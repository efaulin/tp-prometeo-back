import { ObjectId } from "mongodb";

export class Coleccion{
    constructor(
        public name:string,
        public _id?:ObjectId
    ) {};
};
