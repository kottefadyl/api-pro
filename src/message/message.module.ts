import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
// import { MessageController } from './message.controller';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';
import { AuthModule } from 'src/auth/auth.module';
import { Discus, DiscusSchema } from 'src/discussion/schema/discussion.schema';

@Module({
  imports:[AuthModule,MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),MongooseModule.forFeature([{name:Discus.name, schema: DiscusSchema}])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
