import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const swStats = require('swagger-stats');

async function bootstrap() {
  require("dotenv").config();
  const app = await NestFactory.create(AppModule);

  // Add Swagger
  const config = new DocumentBuilder()
    .setTitle('Urban Dictionary API')
    .setDescription('A simple RESTful API to fetch terms from Urban Dictionary')
    .setContact('Inixio Amillano Casteig', 'https://inixio.dev', 'inixio.amillano@inixio.dev')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  // Add Swagger Stats
  app.use(swStats.getMiddleware({
    swaggerSpec: document,
    name: 'Urban Dictionary API',
    uriPath: '/swagger-stats',
    authentication: true,
    onAuthenticate: (req, username, password) => {
      return((username === process.env.STATS_USER) 
          && (password === process.env.STATS_PASS));
    }
  }));
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
