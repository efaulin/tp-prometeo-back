import { Response } from "express";

export class Return {
    constructor(
        private updatetxt:string,
        private deletetxt:string,
        private badInputtxt:string,
        private notFoundtxt:string,
        private generictxt:string,
    ) {};

    public update(res:Response):Response {
        return res.status(200).send(this.updatetxt);
    };

    public delete(res:Response):Response {
        return res.status(202).send(this.deletetxt);
    }

    public badInput(res:Response):Response {
        return res.status(400).send(this.badInputtxt);
    }

    public notFound(res:Response):Response {
        return res.status(404).send(this.notFoundtxt);
    }

    public generic(res:Response):Response {
        return res.status(500).send(this.generictxt);
    }
}