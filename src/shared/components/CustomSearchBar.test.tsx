import { describe, expect, test, vi } from "vitest";
import { CustomSearchBar } from "./CustomSearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe('SearchBar', () => {
    test('should render searchbar correctly', () => {
        const { container } = render(<CustomSearchBar onQuery={() => { }} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();


    });

    test('should call onQuery with the correct value after 700ms', async () => {
        const onQuery = vi.fn();
        render(<CustomSearchBar onQuery={onQuery} />);
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'test' } });
        //await new Promise(resolve => setTimeout(resolve, 701));

        waitFor(() => {

            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        });

    });

    test('should call only once with the last value  (debounced)', async () => {
        const onQuery = vi.fn();
        render(<CustomSearchBar onQuery={onQuery} />);


        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'te' } });
        fireEvent.change(input, { target: { value: 't' } });
        //await new Promise(resolve => setTimeout(resolve, 701));

        waitFor(() => {


            expect(onQuery).toHaveBeenCalledWith('t');
            expect(onQuery).toHaveBeenCalledTimes(1);
        });

    });

    test('should call onquery when button clicked with the imput value', async () => {
        const onQuery = vi.fn();
        render(<CustomSearchBar onQuery={onQuery} />);


        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'test' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalledWith('test');
        expect(onQuery).toHaveBeenCalledTimes(1);
    });

    test('should thw input has the correct placeholder value', async () => {
        const placeholder = 'buscar gifs';
        render(<CustomSearchBar onQuery={() => { }} placeholder={placeholder} />);




        expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
    });
});