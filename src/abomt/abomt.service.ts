import { Injectable } from '@nestjs/common';
import { CreateAbomtDto } from './dto/create-abomt.dto';
import { UpdateAbomtDto } from './dto/update-abomt.dto';

@Injectable()
export class AbomtService {
  create(createAbomtDto: CreateAbomtDto) {
    return 'This action adds a new abomt';
  }

  findAll() {
    return `This action returns all abomt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} abomt`;
  }

  update(id: number, updateAbomtDto: UpdateAbomtDto) {
    return `This action updates a #${id} abomt`;
  }

  remove(id: number) {
    return `This action removes a #${id} abomt`;
  }
}
