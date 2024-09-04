import {Module} from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageService } from 'src/message/message.service';
import { MessageModule } from 'src/message/message.module';

@Module({
    imports:[MessageModule],
    providers:[ChatGateway]
})

export class ChatModule{}