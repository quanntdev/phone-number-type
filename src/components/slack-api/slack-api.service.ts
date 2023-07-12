import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { checkMysqlError } from 'src/common/validatorContraints/checkMysqlError';
import { CreateSlackMessageDto } from './dto/create-slack-mes.dto';
import { SUCCESS_CODES } from 'src/constants/successCodes';
import { CreateChannelDto } from './dto/create-channel.dto';
import { RTMClient as LegacyRTMClient } from '@slack/rtm-api';

@Injectable()
export class SlackApiService implements OnModuleInit{
  private rtmClient: LegacyRTMClient;
  constructor(
    private readonly webClient: WebClient
    ) {
      this.rtmClient = new LegacyRTMClient(process.env.SLACK_SIGNING_SERECT);
    }

  async sendMess(body: CreateSlackMessageDto) {
    try {
      const result = await this.webClient.chat.postMessage({
        channel: body.channelName,
        text: body.message,
      });

      return {
        data: result,
        message: SUCCESS_CODES.CREATE_SUCCESSFULLY,
      };
    } catch (e) {
      checkMysqlError(e);
    }
  }

  async createChannel(body: CreateChannelDto) {
    try {
      const nameChannel:any = this.convertToSlug(body.channelName)
      console.log(nameChannel)
      const result = await this.webClient.conversations.create({
        name: nameChannel,
      });

      const email = "qquannguyentrong123@gmail.com"

      const userResult = await this.webClient.users.lookupByEmail({
        email,
      });

      const userId = userResult.user.id;
      const channelId = result.channel.id;
      
      const inviteResult = await this.webClient.conversations.invite({
        channel: channelId,
        users: userId,
      });


      return {
        data: inviteResult,
        message: SUCCESS_CODES.CREATE_SUCCESSFULLY,
      };
    } catch (e) {
      checkMysqlError(e);
    }
  }

  async removeChannel(
    id: string
  ){
    try {
        const result = await this.webClient.conversations.list();
        const channels = result.channels;
        const channel = channels.find((c) => c.name === id);
  
        if (!channel) {
          throw new Error('Không tìm thấy channel.');
        }
  
        const archiveResult = await this.webClient.conversations.archive({
          channel: channel.id,
        });

        return {
            data: archiveResult,
            message: SUCCESS_CODES.DELETE_SUCCESSFULLY
        }
    } catch(e) {
        checkMysqlError(e)
    }
  }

  async getListChannle() {
    try {
      const result = await this.webClient.conversations.list();
      const channels = result.channels;
      return channels
    } catch(e) {
      checkMysqlError(e)
    }
  }

  protected convertToSlug(text){
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  onModuleInit() {
    this.rtmClient.on('message', async (event) => {
     console.log(event)
    });

    this.rtmClient.start().catch((error) => {
      console.error('Error connecting to Slack:', error);
    });
  }
}
