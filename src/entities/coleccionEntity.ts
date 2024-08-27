import { ObjectId } from "mongodb";

export class Categoria{
    constructor(
        public nombre:string,
        public _id?:ObjectId
    ) {};
};
