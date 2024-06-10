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
        return this.usuarios.find((usr) => usr.idusuario === id);
    }

    static GetAll():Usuario[] {
        return this.usuarios;
    }

    static Create(usr:Usuario):Usuario {
        //Validar no ingrese un "usuario" con id definida (id >= 0)
        //const maxId = usuarios.reduce((max, obj) => (obj.idusuario > max ? obj.idusuario), usuarios[0].idusuario);
        let maxId = 0;
        this.usuarios.forEach((usr) => {if (usr.idusuario > maxId) {omaxId = usr.idusuari}});
        usr.idusuario = maxId + 1;
        this.usuarios.push(usr);
        return usr;
    }

    static Update(usr:Usuario):boolean {
        const indUsr = this.usuarios.findIndex((tmpUsr) => tmpUsr.idusuario === usr.idusuario);
        if (indUsr != -1) {
            usr.idusuario = this.usuarios[indUsr].idusuario;
            this.usuarios[indUsr] = usr;
            return true;
        }
        else {
            return false;
        }
    }

    static Delete(id:number):boolean {
        const oneUsr:Usuario|undefined = this.usuarios.find((usr) => usr.idusuario === id);
        if (oneUsr) {
            this.usuarios.splice(this.usuarios.indexOf(oneUsr),1);
            return true;
        }
        else {
            return false;
        }
    }
}