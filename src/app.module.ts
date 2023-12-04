import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmoCRMLeadsModule } from './amo-crm/amo-crm-leads/amo-crm-leads.module';
import { AmoCRMUsersModule } from './amo-crm/amo-crm-users/amo-crm-users.moduele';
import { AmoCRMContactModule } from './amo-crm/amo-crm-contact/amo-crm-contact.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AmoCRMLeadsModule,
    AmoCRMUsersModule,
    AmoCRMContactModule,
  ],
})
export class AppModule {}
