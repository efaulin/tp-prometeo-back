import { Usuario } from "../entities/usuarioEntity.js";

export class UsuarioRepository{
    //Guardo en memoria
    static usuarios = [
        new Usuario(
            101,
            "pandugat",
            "xd",
            "efaulin@frro.utn.edu.ar",
            "BCSPN"
        ),
        new Usuario(
            102,
            "hborelli",
            "pass",
            "hborelli@frro.utn.edu.ar",
            "type2"
        ),
        new Usuario(
            103,
            "vcoyle",
            "pass2",
            "vcoyle@frro.utn.edu.ar",
            "type3"
        ),
    ];

    static GetOne(id:number):Usuario|undefined {
        return this.usuarios.find((usr) => usr.id === id);
    }

    static GetAll():Usuario[]|undefined{
        //En caso de error mandar "Undefined"
        return this.usuarios;
    }

    static Create(usr:Usuario):Usuario|undefined {
        //Validar no ingrese un "usuario" con id definida (id >= 0)
        //En caso de error mandar "Undefined"
        let maxId = 0;
        this.usuarios.forEach((usr) => {if (usr.id > maxId) {maxId = usr.id}});
        usr.id = maxId + 1;
        this.usuarios.push(usr);
        return usr;
    }

    static Update(usr:Usuario):boolean {
        const indUsr = this.usuarios.findIndex((tmpUsr) => tmpUsr.id === usr.id);
        if (indUsr != -1) {
            usr.id = this.usuarios[indUsr].id;
            this.usuarios[indUsr] = usr;
            return true;
        }
        else {
            return false;
        }
    }

    static Delete(id:number):boolean {
        const oneUsr:Usuario|undefined = this.usuarios.find((usr) => usr.id === id);
        if (oneUsr) {
            this.usuarios.splice(this.usuarios.indexOf(oneUsr),1);
            return true;
        }
        else {
            return false;
        }
    }
}