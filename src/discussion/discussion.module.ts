import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Mongoose, Schema } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Discus, DiscusSchema } from './schema/discussion.schema';
import { Message, MessageSchema } from 'src/message/schema/message.schema';
import { User, UserSchema } from 'src/auth/schema/user.schema';

@Module({
  imports:[AuthModule,MongooseModule.forFeature([{name:Discus.name, schema: DiscusSchema}]), MongooseModule.forFeature([{name:Message.name, schema:MessageSchema}]),MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  controllers: [DiscussionController],
  providers: [DiscussionService],
})
export class DiscussionModule {}
