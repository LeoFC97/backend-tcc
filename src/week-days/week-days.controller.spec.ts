import { Test, TestingModule } from '@nestjs/testing';
import { WeekDaysController } from './week-days.controller';
import { WeekDaysService } from './week-days.service';

describe('WeekDaysController', () => {
  let controller: WeekDaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeekDaysController],
      providers: [WeekDaysService],
    }).compile();

    controller = module.get<WeekDaysController>(WeekDaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
