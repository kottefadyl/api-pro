import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Discus, discusDocument } from "./schema/discussion.schema";
import { User, UserDocument } from "src/auth/schema/user.schema";
import { Message, messageDocument } from "src/message/schema/message.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class DiscussionService {
  constructor(
    @InjectModel(Discus.name) private readonly discusModel: Model<discusDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Message.name) private readonly messageModel: Model<messageDocument>,
  ) {}

  async findAll(userId: string) {
    // Convert the userId to ObjectId
    const userObjectId = new Types.ObjectId(userId);

    const discussions = await this.discusModel.aggregate([
      {
        $match: {
          personnes: userObjectId
        }
      },
      {
        $lookup: {
          from: 'users',
          let: { personnes: '$personnes', userId: userObjectId },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ['$_id', '$$userId'] }, // Ensure the user is not the same as the provided userId
                    { $in: ['$_id', '$$personnes'] }
                  ]
                }
              }
            },
            {
              $project: {
                _id: 1,
                profileImg: 1,
                name: 1,
                firstname: 1,
                email: 1,
                status: 1
              }
            }
          ],
          as: 'otherUser'
        }
      },
      {
        $unwind: '$otherUser'
      },
      {
        $lookup: {
          from: 'messages',
          let: { discusId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$discus', '$$discusId']
                }
              }
            },
            {
              $sort: { createdAt: -1 } // Sort messages by creation date in descending order
            },
            {
              $limit: 1 // Only get the most recent message
            },
            {
              $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'senderDetails'
              }
            },
            {
              $unwind: '$senderDetails'
            },
            {
              $project: {
                text: 1,
                file: 1,
                sender: '$senderDetails._id',
                senderName: { $concat: ['$senderDetails.firstname', ' ', '$senderDetails.name'] } // Optional: concatenate first and last name
              }
            }
          ],
          as: 'lastMessage'
        }
      },
      {
        $unwind: { path: '$lastMessage', preserveNullAndEmptyArrays: true } // Handle cases where there might not be any messages
      },
      {
        $project: {
          _id: 1,
          otherUser: 1,
          lastMessage: {
            text: 1,
            file: 1,
            sender: 1,
            senderName: 1
          }
        }
      }
    ]).exec();

    return discussions;
  };

  async getDiscussionDetails(discusId: string, currentUserId: string) {
    const discusObjectId = new Types.ObjectId(discusId);
    const currentUserObjectId = new Types.ObjectId(currentUserId);
  
    // Retrieve the discussion to find the second user
    const discus = await this.discusModel.findById(discusObjectId)
      .populate({
        path: 'personnes',
        match: { _id: { $ne: currentUserObjectId } },
        select: 'name firstname email profileImg' // Only include required fields for the second user
      })
      .exec();
  
    if (!discus) {
      throw new NotFoundException(`Discussion with ID ${discusId} not found.`);
    }
  
    // Check if there is exactly one other user in the discussion
    if (discus.personnes.length !== 1) {
      throw new NotFoundException(`The discussion must contain exactly one other user.`);
    }
  
    // Retrieve the second user details
    const secondUser = discus.personnes[0]; 
  
    // Retrieve all messages for the given discussion
    const messages = await this.messageModel.find({ discus: discusObjectId })
      .sort({ createdAt: 1 }) // Sort messages by creation date in ascending order
      .exec();
  
    return {
      secondUser: {
        _id: secondUser._id,
        name: secondUser.name,
        firstname: secondUser.firstname,
        email: secondUser.email,
        profileImg: secondUser.profileImg
      },
      messages
    };
  }
  
}
