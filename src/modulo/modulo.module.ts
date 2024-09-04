import { Module } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Modulo, ModuloSchema } from './schema/modulo.schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { Formation, FormationSchema } from 'src/formation/schema/formation.shema';



@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: Modulo.name, schema: ModuloSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{name:Formation.name, schema: FormationSchema}])
  ],
  controllers: [ModuloController],
  providers: [ModuloService],
})
export class ModuloModule { }
