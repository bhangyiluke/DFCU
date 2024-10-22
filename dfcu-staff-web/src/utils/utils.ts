// import { debounce } from "rxjs";

const memoize = (func: Function) => {
    const cache = Object({});
    return (...args: any) => {
        const key = JSON.stringify(args);
        // console.log("Pulling from cache",key)
        if (cache[key]) {
            console.log("Pulling from cache", key)
            return cache[key];
        } else {
            const result = func.apply(this, args);
            cache[key] = result;
            return result;
        }
    }

}

const throttle = (func: Function, delay: number) => {
    const lastTime = 0;
    return (...args: any) => {
        const now = new Date().getTime();
        const elapsed = now - lastTime >= delay;
        if (elapsed) {
            func.apply(this, args);
        }
    }

}

const debounce = (func: Function, delay: number) => {
    let timeoutId: any;
    return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    }
}

export default { memoize, throttle, debounce };