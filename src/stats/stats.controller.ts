import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';

import { StatsService } from './stats.service';
import { Subject } from 'src/common/schemas/subject/subject.schema';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  create() {
    return this.statsService.create();
  }
  findAll() {
    return this.statsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return Subject.name;
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.statsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsService.remove(+id);
  }
}
