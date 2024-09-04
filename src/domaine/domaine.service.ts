import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateDomaineDto } from './dto/create-domaine.dto';
import { UpdateDomaineDto } from './dto/update-domaine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Domaine, DomaineDocument } from './schema/domaine.schema';
import { Model } from 'mongoose';


@Injectable()
export class DomaineService {
  @InjectModel(Domaine.name) private domaineModel: Model<DomaineDocument>


  async create(createDomaineDto: CreateDomaineDto): Promise<Domaine> {
    console.log(createDomaineDto);
    
    if ((!createDomaineDto.intitule ) || (!createDomaineDto.imgDomaine) || (!createDomaineDto.prixDvF) || (!createDomaineDto.frequenceMaj) ) {
     throw new BadRequestException('bien remplire tout les champs') 
    }
    const data = createDomaineDto;
    const createDomaine = new this.domaineModel(data)
    return await createDomaine.save()  
  }

  async findAll() : Promise<Domaine[]>{
    return await this.domaineModel.find();
  }

  async findOne(id: string) {
    return await this.domaineModel.findById(id)
  }

  update(id: number, updateDomaineDto: UpdateDomaineDto) {
    return `This action updates a #${id} domaine`;
  }

  remove(id: number) {
    return `This action removes a #${id} domaine`;
  }
}
