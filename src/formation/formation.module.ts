import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Formation, FormationSchema } from './schema/formation.shema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [AuthModule, MongooseModule.forFeature([{name:Formation.name, schema:FormationSchema}])],
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
