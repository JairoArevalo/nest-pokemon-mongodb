import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { GetPokemon, ResultPokemon } from './interfaces/pokemon-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  private readonly axios:AxiosInstance = axios; 

  constructor(private readonly pokemonService:PokemonService,
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>
  ) {

  }




  async executeSeed():Promise<CreatePokemonDto[]> {
    await this.pokemonModel.deleteMany({}); // delete ¨* from pokemons
    const {data}  = await this.axios.get<GetPokemon>('https://pokeapi.co/api/v2/pokemon?limit=150');
    const pokemonToInsert:{name:string,no:number}[] = [];
    data.results.forEach( async ({name,url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      console.log(`${name} #${no}`);
      pokemonToInsert.push({name, no});
    });
    const pokemones = await this.pokemonService.insertPokemonLote(pokemonToInsert);
    return pokemones;
  } 

}


