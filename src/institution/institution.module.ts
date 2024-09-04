import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Institution, InstitutionSchema } from './Schema/institution.schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { Domaine, DomaineSchema } from 'src/domaine/schema/domaine.schema';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{name: Institution.name, schema:InstitutionSchema}]), MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), MongooseModule.forFeature([{name:Domaine.name, schema:DomaineSchema}])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
