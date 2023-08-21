import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public';

@Controller()
export class AppController {
  @Public()
  @Get()
  hello() {
    return 'HELLO ON MAIN ROUTE!';
  }
}
