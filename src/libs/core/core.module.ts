import { Module } from '@nestjs/common';

import { controllers } from './controllers/index';
import { services } from './services/index';

@Module({
  controllers: [
    ...controllers
  ],
  components: [
    ...services
  ],
})
export class CoreModule {
}
