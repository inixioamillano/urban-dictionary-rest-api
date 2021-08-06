import { Injectable, NotFoundException } from '@nestjs/common';
const axios = require('axios');
const cheerio = require('cheerio');


@Injectable()
export class TermService {

    async searchTerm(query: string) {
        try {
            const pageContent = await axios.get(`https://www.urbandictionary.com${query}`);
            const $ = cheerio.load(pageContent.data);
            const words = $('.def-panel').map((_, el) => {
                el = $(el);
                const word = el.find('.word').text();
                const meaning = el.find('.meaning').text();
                const example = el.find('.example').text();
                return { word, meaning, example };
            }).get();
            console.log(words);
            return words;
        } catch(e) {
            throw new NotFoundException();
        }
    }

}
