import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act, renderHook } from "@testing-library/react";


import * as gifsActions from '../actions/get-gifs-by-query.actions';

describe('useGifs', () => {
    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousSearches.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
    });


    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {

            await result.current.handleSearch('cat');

        });


        expect(result.current.gifs.length).toBe(10);
    });


    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {

            await result.current.handleTermClicked('cat');

        });


        expect(result.current.gifs.length).toBe(10);
    });


    test('should return a list of gifs from cache ', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {

            await result.current.handleTermClicked('cat');

        });


        expect(result.current.gifs.length).toBe(10);


        vi.spyOn(gifsActions, 'getGifsByQuery')
            .mockRejectedValue(new Error('This is my custom error'));

        await act(async () => {

            await result.current.handleTermClicked('cat');

        });
        await act(async () => {

            await result.current.handleTermClicked('cat');

        });
        expect(result.current.gifs.length).toBe(10);
    });



    test('should return no more than 8 previous terms ', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifsActions, 'getGifsByQuery')
            .mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('cat1');
        });
        await act(async () => {
            await result.current.handleSearch('cat2');
        });
        await act(async () => {
            await result.current.handleSearch('cat3');
        });
        await act(async () => {
            await result.current.handleSearch('cat4');
        });
        await act(async () => {
            await result.current.handleSearch('cat5');
        });
        await act(async () => {
            await result.current.handleSearch('cat6');
        });
        await act(async () => {
            await result.current.handleSearch('cat7');
        });
        await act(async () => {
            await result.current.handleSearch('cat8');
        });



        expect(result.current.previousSearches.length).toBe(8);
        expect(result.current.previousSearches).toStrictEqual([
            'cat8',
            'cat7',
            'cat6',
            'cat5',
            'cat4',
            'cat3',
            'cat2',
            'cat1'

        ])

    });

})