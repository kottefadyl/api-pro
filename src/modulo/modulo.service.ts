import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { User  } from 'src/auth/schema/user.schema';

import { Modulo, ModuloDocument } from './schema/modulo.schema';
import { Formation, FormationDocument } from 'src/formation/schema/formation.shema';

@Injectable()
export class ModuloService {
  constructor(
    @InjectModel(Modulo.name) private moduloModel: Model<ModuloDocument>,
    @InjectModel(User.name) private userModel: Model<User>, // Inject the User model
    @InjectModel(Formation.name) private formationModel: Model<FormationDocument>

) { }
  async create(createModuloDto: CreateModuloDto, user: User) {
    if (!user || user.status !== 'professionel') {
      throw new ForbiddenException("Vous n'êtes pas autorisé à créer des modulo");
    }

    if (!user.isLogin) {
      throw new ForbiddenException("login first")
    }
    
    const data = { ...createModuloDto, byUser: user._id };
    const createModulo = new this.moduloModel(data);
    console.log(createModuloDto);
    console.log(user);

    createModulo.save();

    await this.formationModel.updateOne(
      { _id: createModulo.formationId },
      { $addToSet: { modulos: createModulo._id } }
    )

    return { message: "Modulo creer avec succès" };
  }

  async likeModulo(moduloId: string, user: User) {
    console.log(user);
    if (user.status === "professionel") {
      throw new ConflictException("les professionnel ne peuvent pas noté les modulo")
    }

    if (!user) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à noter un modulo");
    }
    // Assurez-vous que le user._id est du type mongoose.Types.ObjectId
    const userId = user._id as any;
    console.log(moduloId);

    // Trouver le modulo par ID
    const modulo = await this.moduloModel.findById(moduloId).exec();
    if (!modulo) {
      throw new NotFoundException('Modulo non trouvé');
    }
    // Vérifier si l'utilisateur a déjà aimé le modulo
    const hasLiked = modulo.usersLike.some(userLikeId => userLikeId.equals(userId));
    if (hasLiked) {
      throw new ConflictException("Vous avez déjà noté ce modulo");
    }
   // Ajouter l'utilisateur à la liste des utilisateurs qui aiment le modulo
   modulo.usersLike.push(userId);

   // Sauvegarder les modifications du modulo
   await modulo.save();

   // Ajouter l'identifiant du modulo dans le tableau modulosLiked de l'utilisateur
   await this.userModel.updateOne(
     { _id: userId },
     { $addToSet: { modulosLiked: moduloId } } // Utiliser $addToSet pour éviter les doublons
   );
   return { message: "Modulo noté avec succès" };
  }

  async findAll() {
    return this.moduloModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} modulo`;
  }

  update(id: string, updateModuloDto: UpdateModuloDto) {
    return `This action updates a #${id} modulo`;
  }

  remove(id: string) {
    return `This action removes a #${id} modulo`;
  }
}
