import axios from 'axios';
import { ComicResponse } from './model';

const basePath = 'https://gateway.marvel.com:443/v1/public/';

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;

const apiKey = `apikey=${publicKey}`


const MarvelService = {
    async getComics (offset: number): Promise<ComicResponse> {
        const response = await axios.get(`${basePath}comics?orderBy=title&offset=${offset}&${apiKey}`);
        return response.data.data;
    },
    findComicBookByAuthor(author: string) {
        throw new Error('not implemented');
    }
}

export default MarvelService;