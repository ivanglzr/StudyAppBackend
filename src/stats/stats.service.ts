import { Injectable } from '@nestjs/common';

@Injectable()
export class StatsService {
  create() {
    return 'This action adds a new stat';
  }

  findAll() {
    return `This action returns all stats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stat`;
  }

  update(id: number) {
    return `This action updates a #${id} stat`;
  }

  remove(id: number) {
    return `This action removes a #${id} stat`;
  }
}
