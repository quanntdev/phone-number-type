import { Body, Controller, Get, Inject, Param, Post, Query , Req, Res, Response} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SlackApiService } from './slack-api.service';
import { PaginationQuery } from 'src/common/dtos';
import { CreateSlackMessageDto } from './dto/create-slack-mes.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { WebClient } from '@slack/web-api';
import { RTMClient as LegacyRTMClient } from '@slack/rtm-api';

@ApiTags('Slack API')
@Controller('api/slack-api')
export class SlackApiController {
  
    constructor(
      @Inject('SLACK_EVENTS') private slackEvents: any,
      private  slackAPIService: SlackApiService,
    ) {}
  @Post('/post-message')
  async sendMessage(
    @Body() body: CreateSlackMessageDto
  ) {
    return await this.slackAPIService.sendMess(body);
  }


  @Post("/channel")
  async createChannel(
    @Body() body: CreateChannelDto
  ) {
    return await this.slackAPIService.createChannel(body);
  }

  @Post("/channel/:id/remove")
  async removeChannel(
    @Param('id') id: string
  ){
    return await this.slackAPIService.removeChannel(id)
  }

  @Get("/channel-list")
  async getListChannel() {
    return await this.slackAPIService.getListChannle()
  }

  @Post()
  handleEvent(@Req() req, @Res() res) {
    console.log(12)
    const { body } = req;
    const challenge = body.challenge;
    if (challenge) {
      res.status(200).send(challenge);
    }
  }
}
