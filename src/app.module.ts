import { Module } from '@nestjs/common';
import { TermModule } from './term/term.module';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
  imports: [
    TermModule
  ]
})
export class AppModule {}
