import { Module } from '@nestjs/common';
import { AmoCRMUsersModule } from '../amo-crm-users/amo-crm-users.moduele';
import { AmoCRMContactModule } from '../amo-crm-contact/amo-crm-contact.module';
import { AmoCRMLeadsController } from './amo-crm-leads.controller';
import { AmoCRMLeadsService } from './amo-crm-leads-service';
@Module({
  imports: [AmoCRMContactModule, AmoCRMUsersModule],
  controllers: [AmoCRMLeadsController],
  providers: [AmoCRMLeadsService],
})
export class AmoCRMLeadsModule {}
