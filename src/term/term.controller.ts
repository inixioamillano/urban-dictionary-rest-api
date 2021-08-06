import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TermService } from './term.service';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Terms')
@Controller('api/v1/term')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Get()
  @ApiOperation({
    description: 'Returns a list of Terms for a specific query'
  })
  @ApiQuery({
    name: 'query', 
    type: 'string', 
    example: 'urban dictionary'
  })
  @ApiOkResponse({
    description: 'A JSON array with the words, their meaning and a example.',
    schema: {
      type:'array',
      items: {
        type: 'object',
        properties: {
          word: {
            type: 'string',
            example: 'Urban Dictionary'
          },
          meaning: {
            type: 'string',
            example: 'A site where it\'s a challenge to find one subject where no one talks about sex.'
          },
          example: {
            type: 'string',
            example: `Me: *Looks up 'Cookie'*\nDefinition: "A woman's pussy."\nMe: Uh, okay. *Looks up 'Kelly Clarkson'\nDefinition: "A fine young piece of ass that I'd do some naughty things to if I met."\nMe: *Looks up 'Herbal Essences'\nDefinition: "The act of ripping a girl's ass and pouring shampoo down the middle."\nMe: Of course, Urban Dictionary. Of course.`
          }
        }
      }
    }
  })
  async findTerm(@Query('query') query: string) {
    const words = await this.termService.searchTerm(`/define.php?term=${query}`);
    return words.filter((item, index) => index !== 1);
  }

  @Get('/random')
  @ApiOperation({
    description: 'Returns a list of random Terms'
  })
  @ApiOkResponse({
    description: 'A JSON array with the words, their meaning and a example.',
    schema: {
      type:'array',
      items: {
        type: 'object',
        properties: {
          word: {
            type: 'string',
            example: 'Urban Dictionary'
          },
          meaning: {
            type: 'string',
            example: 'A site where it\'s a challenge to find one subject where no one talks about sex.'
          },
          example: {
            type: 'string',
            example: `Me: *Looks up 'Cookie'*\nDefinition: "A woman's pussy."\nMe: Uh, okay. *Looks up 'Kelly Clarkson'\nDefinition: "A fine young piece of ass that I'd do some naughty things to if I met."\nMe: *Looks up 'Herbal Essences'\nDefinition: "The act of ripping a girl's ass and pouring shampoo down the middle."\nMe: Of course, Urban Dictionary. Of course.`
          }
        }
      }
    }
  })
  random() {
    return this.termService.searchTerm(`/random.php?page=${Math.floor(1000 * Math.random())}`);
  }

}
