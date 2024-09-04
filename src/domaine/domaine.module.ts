import { Module } from '@nestjs/common';
import { DomaineService } from './domaine.service';
import { DomaineController } from './domaine.controller';
import { AuthModule } from 'src/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { DomaineSchema, Domaine } from './schema/domaine.schema';

@Module({
  imports:[AuthModule, MongooseModule.forFeature([{name: Domaine.name, schema:DomaineSchema}])],
  controllers: [DomaineController],
  providers: [DomaineService],
})
export class DomaineModule {}
