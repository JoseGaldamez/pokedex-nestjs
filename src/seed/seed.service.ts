import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async excecute() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonsToInsert: { name: string; no: number }[] = [];

    await data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonsToInsert.push({ no, name });
    });

    const pokemons = await this.pokemonModel.insertMany(pokemonsToInsert);

    return { message: 'Seed completed', count: data.results.length, pokemons };
  }
  // async excecute() {
  //   await this.pokemonModel.deleteMany({});

  //   const { data } = await this.axios.get<PokeResponse>(
  //     'https://pokeapi.co/api/v2/pokemon?limit=10',
  //   );

  //   const insertPromesesArray = [];

  //   await data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2];
  //     insertPromesesArray.push(this.pokemonModel.create({ no, name }));
  //   });

  //   const pokemons = await Promise.all(insertPromesesArray);

  //   return { message: 'Seed completed', count: data.results.length, pokemons };
  // }
}
