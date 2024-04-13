import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';

describe('CourseService', () => {
  let service: CourseService;
  let mockCourseRepository;

  beforeEach(async () => {
    mockCourseRepository = {
      findAll: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Course' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: CourseRepository, useValue: mockCourseRepository },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of courses', async () => {
    await expect(service.findAll()).resolves.toEqual([{ id: '1', title: 'Test Course' }]);
    expect(mockCourseRepository.findAll).toHaveBeenCalled();
  });
});
