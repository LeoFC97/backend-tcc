/* istanbul ignore file */

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL
    ),
    CourseModule
  ]
})
export class AppModule {}
