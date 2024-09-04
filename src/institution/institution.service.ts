import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { User, UserDocument } from 'src/auth/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Institution, InstitutionDocument } from './schema/institution.schema';
import mongoose, { Model, Types } from 'mongoose';
import { Domaine, DomaineDocument } from 'src/domaine/schema/domaine.schema';





@Injectable()
export class InstitutionService {
  constructor(
    @InjectModel(Institution.name) private institutionModel: Model<InstitutionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Domaine.name) private domaineModel: Model<DomaineDocument> 
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto, user: User) : Promise<Institution > {
    console.log(createInstitutionDto);
    if (!user || !user.isLogin) {
      throw new BadRequestException("login first")
    };
    console.log(user);
    if (user.status!== "professionel") {
      throw new ForbiddenException("only professional acount can create institution")
    };

    console.log(user);
    console.log(createInstitutionDto);
    const data = {...createInstitutionDto, byUser:user._id}
    const createInsti = new this.institutionModel(data)
    return await createInsti.save()
      
  }

  async integrate(user: User, id: string) {
    console.log(user);
    console.log(id);
    if (!user || !user.isLogin) {
      throw new BadRequestException("login first")
    };
    if (user.status === "professionel") {
      throw new ForbiddenException("only standart acount can integrate institution")
    };
    const userId = user._id as any;
    const nowinstitution = await this.institutionModel.findById(id).exec();
    const hasInInstitution = nowinstitution.usersIn.some(UserInId => UserInId.equals(userId))

    if (hasInInstitution) {
      throw new ConflictException("Vous avez déjà integrer cette institution");
    }
    await this.institutionModel.updateOne(
      { _id: id },
      {$addToSet: {usersIn: user._id}}
    )
    await this.userModel.updateOne(
      {_id: user._id}, 
      {$addToSet: {institutions: id}}
    )
    return {succes: true, message: "vous avez integrer l'institution avec success !"}
  }

  async findAll(user: User): Promise<Institution[]> {
    if (!user._id) {
      throw new UnauthorizedException("login first")
    }
    return await this.institutionModel.find();
  }

  async findOne(id: string):Promise<Institution> {
     return await this.institutionModel.findOne({_id:id}).exec();
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return `This action updates a #${id} institution`;
  }

  async addDomaineService(idInst: string, idDoms: any, user: User): Promise<Institution> {
    const {idDom} = idDoms

    console.log(idDoms);
    
    
    
    if (!idDom || !idInst) {
      throw new BadRequestException("Veuillez indexer les champs");
    }
    
    // Convertir idInst et idDom en ObjectId
    const instId = new Types.ObjectId(idInst);
    const domId = new Types.ObjectId(idDom) ;

    // Vérifiez si l'institution existe et récupérez le propriétaire
    const institution = await this.institutionModel.findById(instId).exec();
    if (!institution) {
      throw new BadRequestException("Institution non trouvée");
    }

    // Vérifiez si l'utilisateur est le propriétaire de l'institution
    if (user._id.toString() !== institution.byUser.toString()) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à faire cette modification, seul le propriétaire du groupe le peut");
    }

    // Ajoutez le domaine à l'institution
    await this.institutionModel.updateOne(
      { _id: instId },
      { $addToSet: { domaineIn: domId } }
    ).exec();

    // Ajoutez l'institution au domaine
    await this.domaineModel.updateOne(
      { _id: domId },
      { $addToSet: { institutions: instId } }
    ).exec();

    // Récupérez et retournez la mise à jour de l'institution
    return this.institutionModel.findById(instId).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  }

  async findInstitutionsByUserId(userId: string): Promise<Institution[]> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException("Invalid user ID format");
    }
    // Rechercher toutes les institutions où l'ID de l'utilisateur est dans le tableau usersIn
    const institutions = await this.institutionModel.find({
      usersIn: userId
    }).exec();
    return institutions;
  }

  async findInstitutionsByName(searchString: any): Promise<Institution[]> {
    // Vérification du type de searchString
    if (typeof searchString !== 'string' || !searchString.trim()) {
      throw new BadRequestException("La chaîne de recherche ne peut pas être vide ou doit être une chaîne de caractères valide");
    }
  
    const regex = new RegExp(searchString, 'i'); // 'i' pour rendre la recherche insensible à la casse
    return await this.institutionModel.find({ name: { $regex: regex } }).exec();
  }
  
}
