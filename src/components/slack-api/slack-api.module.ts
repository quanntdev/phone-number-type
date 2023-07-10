import { Module } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { SlackApiController } from './slack-api.controller';
import { SlackApiService } from './slack-api.service';

@Module({
    providers: [
        {
            provide: WebClient,
            useValue: new WebClient(process.env.SLACK_BOT_TOKEN)
        },
        SlackApiService,
    ],
    exports: [WebClient],
    controllers: [SlackApiController]
})
export class SlackApiModule {}
