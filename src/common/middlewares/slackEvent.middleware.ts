// import { NestMiddleware, Injectable } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { SlackApiService } from 'src/components/slack-api/slack-api.service';

// @Injectable()
// export class SlackEventsMiddleware implements NestMiddleware {
//   constructor(private slackEventsService: SlackApiService) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     this.slackEventsService.handleEvent(req.body);
//     res.sendStatus(200);
//   }
// }
