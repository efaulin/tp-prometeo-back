import { mongoose } from "@typegoose/typegoose";
import { UserRepository } from "../repository/userRepository";
import { Request, Response } from 'express';
import { MongoError } from "mongodb";
import { UserSubscription } from "../schemas/userSchema";

export class UserController{
    static async GetAll(req: Request, res: Response){
        try {
            const users = await UserRepository.GetAll();
            if (users) {
                return res.status(200).json(users);
            } else {
                return res.status(404).send("No se encontraron users.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Users");
        }
    }
    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const user = await UserRepository.GetOne(id);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).send("No se encontró el user.");
        } catch (error) {
            console.error("Error al obtener user:", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }
    
    static async Create(req: Request, res: Response){
        if (!UserController.validateUserInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { username, password, email, role, subscriptions } = req.body;
        try {
            const result = await UserRepository.Create(username, password, email, role, subscriptions);
            if (!result) {
                return res.status(406).send("Los datos del user no cumplen alguna validacion");
            } else if (typeof result == "string") {
                return res.status(406).send("Una subscription dada no existe <" + result + ">");
            }
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear user:", error);
            if (error instanceof MongoError && error.code == 11000) {
                if (error.message.includes('username')) {
                    return res.status(406).send("Nombre de user repetido.");
                }
                return res.status(406).send("Dos Suscripciones tienen la misma fecha de inicio.");
            }
            return res.status(500).send("[Error] Create User");
        }
    }
    
    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { username, password, email, role, subscriptions } = req.body;
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (username) updateFields.username = username;
        if (password) updateFields.password = password;
        if (email) updateFields.email = email;
        //Para cambiar el role, la peticion tiene que venir de un user "admin"
        if (role && mongoose.isValidObjectId(role)) {
            if (req.user!.role == "admin") {
                updateFields.role = role;
            } else {
                return res.status(403).send("Rol no autorizado");
            }
        }
        //Para cambiar el historico de subscriptions, la peticion tiene que venir de un user "admin"
        if (subscriptions) {
            if (req.user!.role == "admin") {
                if (!UserController.validateSuscripcionsInput(subscriptions)) {
                    return res.status(400).send("Datos de entrada inválidos.");
                }
                updateFields.subscriptions = subscriptions;
            } else {
                return res.status(403).send("Rol no autorizado");
            }
        };

        try {
            const result = await UserRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró el user para actualizar.");
            } else if (typeof result == "string") {
                if (result == "isNotValid") { return res.status(406).send("Los datos del user no cumplen alguna validacion"); }
                else { return res.status(406).send("Una subscription dada no existe <" + result + ">"); }
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error al actualizar user:", error);
            return res.status(500).send("[Error] Update User");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await UserRepository.Delete(id);
            if (result) {
                return res.status(202).send("User Borrado");
            }
            return res.status(404).send("No se encontró el user");
        } catch (error) {
            console.error("Error al eliminar user:", error);
            return res.status(500).send("[Error] Delete User");
        }
    }

    /**
     * Funcion para validar los inputs de un arreglo de **UserSubscriptiones**
     * @param usrSuscripcions Arreglo del tipo UserSubscriptiones
     * @returns Si cumple con las validaciones devuelve **true**, caso contrario **false**
     */
    static validateSuscripcionsInput(usrSuscripcions:UserSubscription[]) {
        let emptySuscripcion = false;
        if (usrSuscripcions.length >= 1) {
            for (let i=0; i < usrSuscripcions.length && !emptySuscripcion; i++) {
                const tmp = usrSuscripcions[i];
                emptySuscripcion = !(mongoose.isValidObjectId(tmp.subscriptionId) && tmp.startDate && tmp.endDate && tmp.startDate < tmp.endDate)
            }
            return !emptySuscripcion;
        } else {
            return false;
        }
    }

    /**
     * Funcion para validar los inputs de un nuevo **User**
     * @param req Objeto **Request** con los datos del nuevo **User**
     * @returns Si cumple con las validaciones devuelve **true**, caso contrario **false**
     */
    static validateUserInput(req: Request): boolean {
        const { username, password, email, role, subscriptions } = req.body;
        let control;
        if (!subscriptions) {
            return false;   
        } else {
            control = this.validateSuscripcionsInput(subscriptions);
        }
        return username && password && email && role && mongoose.isValidObjectId(role) && control ? true : false;
    };
}