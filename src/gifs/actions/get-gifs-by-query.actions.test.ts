import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.actions";

import { giphySearchResponse } from "../../../test/mock/giphy.response";

import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from "../api/giphy.api";


describe('getGifsByQuery', () => {
    const mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        mock.reset();
        //mock = new AxiosMockAdapter(giphyApi);
    });

    // test('Should return a list of gifs', async () => {
    //     const gifs = await getGifsByQuery('cat');



    //     const [gif1] = gifs;
    //     expect(gif1).toEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String)

    //     });



    // })


    test('Should return a list of gifs', async () => {

        mock.onGet('/search').reply(200, giphySearchResponse);
        const gifs = await getGifsByQuery('cat');

        expect(gifs.length).toBe(10);

        gifs.forEach((gif) => {

            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');

        })

    })


    test('Should return an empty list of gifs if query is empty', async () => {

        //mock.onGet('/search').reply(200, giphySearchResponse);
        const gifs = await getGifsByQuery(' ');


        expect(gifs.length).toBe(0);


    })



    test('Should handle error when api returns an error', async () => {
        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => { });


        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request'
            }
        });

        const gifs = await getGifsByQuery('goku');
        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());




    })
})