import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation, FormationDocument } from './schema/formation.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class FormationService {
constructor(
  @InjectModel(Formation.name) private formationModel: Model<FormationDocument>
){}

 async create(createFormationDto: CreateFormationDto , user : User) {
  console.log(user);
  console.log(createFormationDto);  
  if (!user || user.status !== 'professionel') {
    throw new ForbiddenException("Vous n'êtes pas autorisé à créer des formations");
  }
  const data = { ...createFormationDto, byUser: user._id };
  const createModulo = new this.formationModel(data);
  console.log(createFormationDto);
  console.log(user);
  return createModulo.save();
}

  findAll() {
    return `This action returns all formation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formation`;
  }

  update(id: number, updateFormationDto: UpdateFormationDto) {
    return `This action updates a #${id} formation`;
  }

  remove(id: number) {
    return `This action removes a #${id} formation`;
  }
}
