import { Perritos } from "./perritos";

export interface Adopciones {
    id: number;
    perrito: Perritos;
    imagen: string;
    imagenBase64: string;
    fechaAdopcion: string;
}
