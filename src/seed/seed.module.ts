import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule, MongooseModule]
})
export class SeedModule {}
