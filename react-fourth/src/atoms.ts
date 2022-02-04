import { atom, selector } from "recoil"

const minuteState = atom({
    key: 'minutes',
    default: 0
});

const hourSelector = selector<number>({
    key: 'hour',
    get: ({ get }) => {
        const hour: number = get(minuteState);
        return hour / 60;
    },
    set: ({ set }, newValue) => {
        set(minuteState, Math.round(Number(newValue)) * 60);
    }
});

interface ITodoArr {
    [key: string]: string[]
}

const arr = atom<ITodoArr>({
    key: 'arr',
    default: {
        to_do: ['a', 'b', 'e'],
        done: ['c', 'd'],
        doing: ['f', 'g']
    }
});

export { minuteState, hourSelector, arr };