/* istanbul ignore file */

import { ClassSerializerInterceptor, INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { FastifyInstance } from 'fastify'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common'
import { PROJECT_DESCRIPTION, PROJECT_NAME, PROJECT_VERSION } from './constants'

require('newrelic')

/**
 * Default port number.
 */
const DEFAULT_PORT = 3001
/**
 * Default base url endpoint for api.
 */
const DEFAULT_API_PREFIX = '/api'

/**
 * Default api version.
 */
const DEFAULT_API_VERSION = '1'

/**
 * Default url endpoint for Swagger UI.
 */
const DEFAULT_SWAGGER_PREFIX = '/docs'

/**
 * Setup the Swagger (UI).
 *
 * @param app
 */

const loggerInstance = new Logger('Bootstrap')
export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(PROJECT_NAME)
    .setDescription(PROJECT_DESCRIPTION)
    .setVersion(PROJECT_VERSION)
    .build()

  const document = SwaggerModule.createDocument(app, options)
  const path = process.env.SWAGGER_PREFIX || DEFAULT_SWAGGER_PREFIX
  SwaggerModule.setup(path, app, document)
}

/**
 * Bootstrap the app.
 */
async function bootstrap() {
  const baseUrl = `${process.env.PREFIX || DEFAULT_API_PREFIX}/v${DEFAULT_API_VERSION}`
  const port = process.env.PORT || DEFAULT_PORT

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
    { logger: ['error', 'debug', 'log', 'warn', 'verbose'] }
  )

  app.setGlobalPrefix(baseUrl)
  app.enableCors()

  setupSwagger(app)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const fastifyApp = app.getHttpAdapter().getInstance() as FastifyInstance
  fastifyApp.addHook('preValidation', (req, res, next) => {
    next()
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get<Reflector>(Reflector), {
      enableImplicitConversion: true
    })
  )
  await app.listen(port, '0.0.0.0')
  loggerInstance.log(`Application is running on: ${await app.getUrl()}${process.env.PREFIX || DEFAULT_API_PREFIX}`)
}

// Start the app
bootstrap().catch((error) => loggerInstance.error(error))
