import { Module } from '@nestjs/common';
import { AbomtService } from './abomt.service';
import { AbomtController } from './abomt.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AbomtSchema } from './schema/abomt.schema';
import { Abomt } from './entities/abomt.entity';

@Module({
  imports:[AuthModule, MongooseModule.forFeature([{name: Abomt.name, schema: AbomtSchema }])],
  controllers: [AbomtController],
  providers: [AbomtService],
})
export class AbomtModule {}
