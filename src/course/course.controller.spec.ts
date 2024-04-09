import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';
import { Course } from './schemas/course.schema';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;
  let courseRepository: CourseRepository;

  const expectedMockCoursesResult = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CourseService,
        {
          provide: CourseRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(expectedMockCoursesResult),
          },
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
    courseRepository = module.get<CourseRepository>(CourseRepository);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('reposutory should be defined', () => {
    expect(courseRepository).toBeDefined();
  });


  it('should ansure service will be called', async () => {
    const mockResult: Course ={
      id: 'mock id',
      name: 'mock name',
      periods: '' as any
    } 
    const spyOnService = jest.spyOn(service, 'findAll')
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([mockResult])
    await controller.findAll();
    expect(spyOnService).toHaveBeenCalled();
  });

  // Adicione mais testes conforme necessário
});
