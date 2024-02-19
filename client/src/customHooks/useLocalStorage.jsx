import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
