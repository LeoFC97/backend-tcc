import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';
import { getModelToken } from '@nestjs/mongoose';

describe('CourseService', () => {
  let service: CourseService;
  let repository: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        CourseRepository,
        {
          provide: getModelToken('Course'), // Use o mesmo nome do modelo definido em @InjectModel(Course.name)
          useValue: {}, // Mock do CourseModel
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get<CourseRepository>(CourseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
