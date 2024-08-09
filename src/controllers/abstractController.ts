export function Controller<T>() {
    abstract class Controller {
        public static async GetOne(id:string) : Promise<T|undefined> { return undefined; }
        public static async GetAll() : Promise<T[]|undefined> { return undefined; }
        public static async Create(t:T) : Promise<T|undefined> { return undefined; }
        public static async Update(t:T) : Promise<T|undefined> { return undefined; }
        public static async Delete(id:string) : Promise<T|undefined> { return undefined; }
    }
    return Controller;
}