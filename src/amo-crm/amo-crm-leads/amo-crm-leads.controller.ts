import { Controller, Get, HttpException, Query, Res } from '@nestjs/common';
import { AmoCRMLeadsService } from './amo-crm-leads-service';
import { Response } from 'express';

@Controller('/api')
export class AmoCRMLeadsController {
  constructor(private readonly leadService: AmoCRMLeadsService) {}
  @Get('leads')
  async getLeads(@Query('query') query: string, @Res() res: Response) {
    try {
      await this.leadService.getLeads(query, res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
