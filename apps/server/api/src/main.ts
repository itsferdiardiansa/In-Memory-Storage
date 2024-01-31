import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

import { seedData } from '@/seeders'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  seedData()

  await app.listen(process.env.APP_PORT)
}

bootstrap()
