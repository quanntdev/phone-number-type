import { Body, Controller, Get, Param, Post, Query, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SlackApiService } from './slack-api.service';
import { PaginationQuery } from 'src/common/dtos';
import { CreateSlackMessageDto } from './dto/create-slack-mes.dto';
import { CreateChannelDto } from './dto/create-channel.dto';

@ApiTags('Slack API')
@Controller('api/slack-api')
export class SlackApiController {
    constructor(private readonly slackAPIService: SlackApiService) {}

  @Post()
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

  @Post("/events")
  async handleEvent(@Body() body:any) {


    // Process the event payload received from Slack
    if (body.type === 'event_callback') {
      const event = body.event;
      if (event.type === 'message' && event.channel === 'C05G59QF3DZ') {
        console.log('Received message:', event.text);
        // Process the received message from Slack here
      }
    }
  }
}
