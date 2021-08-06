import { Module } from '@nestjs/common';
import { TermService } from './term.service';
import { TermController } from './term.controller';

@Module({
  controllers: [TermController],
  providers: [TermService]
})
export class TermModule {}
