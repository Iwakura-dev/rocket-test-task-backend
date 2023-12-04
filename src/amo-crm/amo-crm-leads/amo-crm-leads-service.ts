import { HttpException, Injectable } from '@nestjs/common';
import { AmoCRMContactService } from '../amo-crm-contact/amo-crm-contact.service';
import { AmoCRMUserService } from '../amo-crm-users/amo-crm-users.service';
import axios from '../../config/axios.config';
import async from 'async';
import { Response } from 'express';

@Injectable()
export class AmoCRMLeadsService {
  constructor(
    private readonly userService: AmoCRMUserService,
    private readonly contactService: AmoCRMContactService,
  ) {}
  async getLeads(query: string, res: Response) {
    try {
      const { data } = await axios.get(`leads`, {
        params: {
          with: 'contacts',
          query: query,
        },
      });
      const leadsRaw = data._embedded.leads;
      return await async.map(leadsRaw, async (lead) => {
        const status = await this.getStatus(lead.pipeline_id, lead.status_id);
        const contacts = await async.map(
          lead._embedded.contacts,
          async (contact) => {
            return await this.contactService.getContact(contact.id);
          },
        );
        const responsibleUser = await this.userService.getUser(
          lead.responsible_user_id,
        );
        const data = {
          id: lead.id,
          name: lead.name,
          price: lead.price,
          status: status,
          responsible_user: responsibleUser,
          created_at: new Date(lead.created_at * 1000).toLocaleString(),
          contacts: contacts,
        };
        res.json(data);
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async getStatus(pipelineId: number, statusId: number) {
    try {
      const { data } = await axios.get(
        `leads/pipelines/${pipelineId}/statuses/${statusId}`,
      );
      return {
        id: data.id,
        name: data.name,
        color: data.color,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
