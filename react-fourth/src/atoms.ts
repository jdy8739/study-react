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
enum TodoState {
    'TO_DO' = 'TO_DO',
    'DONE' = 'DONE',
    'DOING' = 'DOING'
};

interface ITodoElem {
    todo: string,
    id: number,
};

interface ITodoArr {
    [key: string]: ITodoElem[]
};

const arr = atom<ITodoArr>({
    key: 'arr',
    default: {
        to_do: [{ todo: 'Hello', id: 2123213213 }],
        done: [{ todo: 'Hi', id: 65464756858 }],
        doing: [{ todo: 'Bye', id: 96876756832 }]
    }
});

export { minuteState, hourSelector, arr, ITodoElem };