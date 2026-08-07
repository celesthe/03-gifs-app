import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe('useCounter', () => {


    test('should initialize with default value of 10', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
    });


    test('should initialize with value', () => {
        const initialValue = 5;
        const { result } = renderHook(() => useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);
    });

    test('should increment counter when handleAdd is called', () => {
        const initialValue = 10;
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleAdd();
        });


        expect(result.current.counter).toBe(initialValue + 1);

    });


    test('should decrement counter when handleSubtract is called', () => {
        const initialValue = 10;
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleSubtract();
        });


        expect(result.current.counter).toBe(initialValue - 1);

    });

    test('should reset to initial value the counter when handlereset is called', () => {
        const initialValue = 10;
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleSubtract();
        });
        act(() => {
            result.current.handleSubtract();
        });
        act(() => {
            result.current.handleSubtract();
        });

        expect(result.current.counter).toBe(7);

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.counter).toBe(initialValue);

    });
});