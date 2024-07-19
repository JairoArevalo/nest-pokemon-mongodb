import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<Pokemon>) {

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const createPokemon = await this.pokemonModel.create(createPokemonDto);
      return createPokemon

    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new BadRequestException('El nombre del pokemon ya existe' + `J${JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException(`No se puede crear el pokemon verificar datos`);

    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(terminoBusquedaPokemon: string) {

    try {
      let pokemon
      //Busqueda por id pokemon
      if (!isNaN(+terminoBusquedaPokemon)) {
        pokemon = await this.pokemonModel.findOne({ no: terminoBusquedaPokemon });
        return pokemon;
      }
      // Busqueda Mongo ID
      if (isValidObjectId(terminoBusquedaPokemon) && !pokemon) {
        pokemon = await this.pokemonModel.findById(terminoBusquedaPokemon);
        return pokemon;
      }

      //Busqueda nombre
      if (!pokemon) {
        pokemon = await this.pokemonModel.findOne({ name: terminoBusquedaPokemon.toLowerCase().trim() });
        if (pokemon) {
          return pokemon;
        }
        throw new BadRequestException('El nombre del pokemon no existe');
      }




    } catch (error) {
      throw new BadRequestException('El id o nombre del pokemon no existe');
    }
  }

  async update(terminoActualizacion: string, updatePokemonDto: UpdatePokemonDto) {

    try {
      
      let pokemon
      if (!isNaN(+terminoActualizacion)) {
        pokemon = await this.pokemonModel.findOneAndUpdate({ no: terminoActualizacion }, updatePokemonDto, { new: true });
        return pokemon;
      }
      if (isValidObjectId(terminoActualizacion)) {
        pokemon = await this.pokemonModel.findByIdAndUpdate(terminoActualizacion, updatePokemonDto, { new: true });
        return pokemon;
      }
      pokemon = await this.pokemonModel.findOneAndUpdate({ name: terminoActualizacion.toLowerCase().trim() }, updatePokemonDto, { new: true });
      if (pokemon) {
        return pokemon;
      }
      throw new BadRequestException('El nombre del pokemon no existe');

    } catch (error) {
      if (error.code == 11000) {
        throw new BadRequestException('El nombre del pokemon ya existe' + `${JSON.stringify(error.keyValue)}`);
      }
    }


  }

  async remove(id: string) {
    let pokemon 
    pokemon = await this.pokemonModel.findByIdAndDelete(id);
    if (pokemon) {
      return pokemon
    }
    throw new BadRequestException('El id del pokemon no existe');
  }
}
