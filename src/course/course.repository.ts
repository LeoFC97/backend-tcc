import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Course, CourseDocument } from './schemas/course.schema'
import { CreateCourseDto } from './dto/create-course.dto'


@Injectable()
export class CourseRepository {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async findAll(): Promise<any> {
    try {
      const result = await this.courseModel.find().lean().exec();
      return result
    } catch (error) {
      throw new NotFoundException('Courses not found');
    }
  }

  async create(courseToBeCreated: CreateCourseDto): Promise<Course> {
    const courseCreated = await this.courseModel.create(courseToBeCreated)
    return courseCreated.toObject()
  }
}
