import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document{

    // id: string mongo 
    @Prop({
        unique: true, // no se puede repetir el nombre
        index: true, // se crea un indice para que sea mas rapido la busqueda
    })
    name: string;
    @Prop({
        unique: true, // no se puede repetir el nombre
        index: true, // se crea un indice para que sea mas rapido la busqueda
    })
    no: number;



}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);