import { HttpException, Injectable } from '@nestjs/common';
import axios from '../../config/axios.config';

@Injectable()
export class AmoCRMUserService {
  async getUser(id: number) {
    try {
      const { data } = await axios.get(`users/${id}`);
      return {
        id: data.id,
        name: data.name,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
