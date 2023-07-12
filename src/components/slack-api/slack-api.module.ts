import { Module } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { SlackApiController } from './slack-api.controller';
import { SlackApiService } from './slack-api.service';
import { createEventAdapter } from '@slack/events-api';

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
export class SlackApiModule {
    constructor(
        private slackApiService: SlackApiService
    ) {}

    static register(signingSecret: string) {
        const slackEvents = createEventAdapter(signingSecret);
        slackEvents.on('message', (event) => {
          console.log(event)
        });
        slackEvents.on('error', console.error);
    
        return {
          module: SlackApiModule,
          providers: [
            {
              provide: 'SLACK_EVENTS',
              useValue: slackEvents,
            },
          ],
        };
      }
}
