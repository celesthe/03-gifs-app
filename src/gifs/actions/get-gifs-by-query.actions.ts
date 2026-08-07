import type { Gif } from "../interfaces/gif.interface";
import { giphyApi } from "../api/giphy.api";
import type { GiphyResponse } from "../interfaces/giphy.response";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
    try {
        const response = await giphyApi<GiphyResponse>(
            '/search',
            {
                params: {
                    q: query,
                    limit: 10
                }
            }
        );

        return response.data.data.map((gif) => ({

            id: gif.id,
            title: gif.title,
            url: gif.images.downsized_medium.url,
            width: Number(gif.images.downsized_medium.width),
            height: Number(gif.images.downsized_medium.height),

        }));



    }
    catch (error) {

        console.error(error);
        return [];
    }


}