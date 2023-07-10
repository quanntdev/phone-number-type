import { Injectable, OnModuleInit } from '@nestjs/common';
import { RTMClient, LogLevel } from '@slack/rtm-api';

// @Injectable()
// export class SlackSocketService implements OnModuleInit {
//   private rtmClient: RTMClient;

//   onModuleInit() {
//     this.rtmClient = new RTMClient("xoxb-5534014623207-5549427548626-kuwghg1uDGVFFAAguw9yAPdU", {
//     });

//     this.rtmClient.on('message', (event) => {
//       if (event.text && event.channel === 'C05G59QF3DZ') {
//         console.log('Received message:', event.text);
//       }
//     })

//     this.rtmClient.start().then(() => {
//       console.log('RTMClient started');
//     });
//   }
// }
