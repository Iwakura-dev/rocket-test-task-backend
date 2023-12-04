import { Module } from '@nestjs/common';
import { AmoCRMContactService } from './amo-crm-contact.service';

@Module({
  imports: [],
  providers: [AmoCRMContactService],
  exports: [AmoCRMContactService],
})
export class AmoCRMContactModule {}
