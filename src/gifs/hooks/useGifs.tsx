import { useRef, useState } from 'react';
import { getGifsByQuery } from '../actions/get-gifs-by-query.actions';
import type { Gif } from '../interfaces/gif.interface';


//const gifCache: Record<string, Gif[]> = {};

export const useGifs = () => {

    const [gifs, setGifs] = useState<Gif[]>([])
    const [previousSearches, setPreviousSearches] = useState<string[]>([]);

    const gifCache = useRef<Record<string, Gif[]>>({});


    const handleTermClicked = async (term: string) => {

        if (gifCache.current[term]) {
            setGifs(gifCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
        gifCache.current[term] = gifs;
    };

    const handleSearch = async (query: string = '') => {

        query = query.trim().toLocaleLowerCase();

        //1. validar que el query no este vacio
        if (query.length === 0) return;

        if (previousSearches.includes(query)) return;

        setPreviousSearches([query, ...previousSearches.slice(0, 8)]);

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);

        gifCache.current[query] = gifs;
        console.log(gifCache.current);

    }


    return {

        gifs,
        previousSearches,
        handleTermClicked,
        handleSearch

    }
}
