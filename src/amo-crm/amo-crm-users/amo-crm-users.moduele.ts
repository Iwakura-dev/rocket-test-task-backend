import { Module } from '@nestjs/common';
import { AmoCRMUserService } from './amo-crm-users.service';
@Module({
  imports: [],
  providers: [AmoCRMUserService],
  exports: [AmoCRMUserService],
})
export class AmoCRMUsersModule {}
