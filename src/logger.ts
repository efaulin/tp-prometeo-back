import { Express } from "express";

/**
 * Pequeño logger para depuerar y comprobar peticiones a recursos
 *
 * Nivel de detalle:
 *
 *     0 -> Sin log
 *     1 -> Muestra peticion
 *     2 -> Muestra peticion + protocolo + direccion de acceso
 */
export function logger(lvl:number, app:Express):void {
    if (lvl > 0) {
        app.use(function(req, res, next) {
            if (lvl == 1) {
                console.log("Acceso -> " + req.path);
            } else {
                console.log(`Acceso -> ${req.protocol}://${req.get('host')}${req.originalUrl}`);
            }
            next();
        });
    }
};