import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { User } from 'src/auth/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Message, messageDocument } from './schema/message.schema';
import { Model } from 'mongoose';
import { Discus, discusDocument } from 'src/discussion/schema/discussion.schema';
import * as Pusher from "pusher"
import { log } from 'console';

// this.pusher = new Pusher({
//   appId: "1851379",
//   key: "2f8e17a224ff56ac570c",
//   secret: "550def4f382e2951dd74",
//   cluster: "sa1",
//   useTLS: true    
// })

@Injectable()
export class MessageService {
  pusher: Pusher
  constructor(
    @InjectModel(Message.name) private messageModel: Model<messageDocument>,
    @InjectModel(Discus.name) private discusModel: Model<discusDocument>
  ) { 
    this.pusher = new Pusher({
      appId: "1851379",
      key: "2f8e17a224ff56ac570c",
      secret: "550def4f382e2951dd74",
      cluster: "sa1",
      useTLS: true    
    })
  }

  async create(createMessageDto: CreateMessageDto, user: User) {
    try {
      if (!user || !user._id) {
        throw new UnauthorizedException("login first");
      }

      if (!createMessageDto.reciver) {
        throw new BadRequestException("veuillez renseigner toutes les informations sur le message");
      }

      createMessageDto.sender = user._id as any;

      // Check if a discussion already exists
      let discussion = await this.discusModel.findOne({
        personnes: { $all: [createMessageDto.sender, createMessageDto.reciver] }
      }).exec();

      if (!discussion) {
        // Create a new discussion
        discussion = new this.discusModel({
          personnes: [createMessageDto.sender, createMessageDto.reciver],
        });
        await discussion.save();
      }

      createMessageDto.discus = discussion._id as any;
      
      // Save the message to the database
      const message = new this.messageModel(createMessageDto);
      const savedMessage = await message.save();

      console.log("ici",savedMessage);
      
      // Trigger Pusher with the saved message
      await this.trigger(savedMessage.discus.toString(), "message", savedMessage);

    } catch (error) {
      console.error("Error creating message: ", error);
      throw new InternalServerErrorException("An error occurred while creating the message");
    }
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  async createMessageWithSocket(createMessageDto: CreateMessageDto){

    let discussion = await this.discusModel.findOne({
      personnes: { $all: [createMessageDto.sender, createMessageDto.reciver] }
    }).exec();

    if (discussion) {
      createMessageDto.discus = discussion._id as any
      const data = { ...createMessageDto }
      const sendMessage = new this.messageModel(data)
     await sendMessage.save()
      
    } else {
      // Create a new discussion
      discussion = new this.discusModel({
        personnes: [createMessageDto.sender, createMessageDto.reciver],
      });
      await discussion.save();
      createMessageDto.discus = discussion._id as any
      const data = { ...createMessageDto }
      const sendMessage = new this.messageModel(data)
      await sendMessage.save()
    }
  }

  async trigger(channel: string, event: string, data:any){
    try {
      await this.pusher.trigger(channel, event, data);
    } catch (error) {
      console.error("Pusher trigger error: ", error);
      throw new InternalServerErrorException("An error occurred while triggering the event");
    }
  }
}
