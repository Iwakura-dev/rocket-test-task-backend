import { HttpException, Injectable } from '@nestjs/common';
import axios from '../../config/axios.config';

@Injectable()
export class AmoCRMContactService {
  async getContact(id: number) {
    try {
      const { data } = await axios.get(`contacts/${id}`);
      return {
        id: data.id,
        name: data.name,
        phone_number:
          data.custom_fields_values[0].field_name === 'Телефон'
            ? data.custom_fields_values[0].values[0].value
            : undefined,
        email:
          data.custom_fields_values[1].field_name === 'Email'
            ? data.custom_fields_values[1].values[0].value
            : undefined,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
