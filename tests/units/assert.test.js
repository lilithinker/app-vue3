import { describe,expect,test } from "vitest";
import { hasOwnProperty ,getCurUrl,getNull, getGlobalName, isBiger} from "@/utils/index.js";

describe('this is a learning assert test',()=>{
    test('soft',()=>{
        // expect.soft(1+1).toBe(3);
        // expect(1+1).toBe(3);
        expect(1+1).toBe(2)
    })
    test('not',()=>{
        expect(getCurUrl()).not.toBe('http://localhost:3000')
    })
    test('assert: toBe',()=>{
        const obj = {name:'bob'};
        expect(hasOwnProperty('name',obj)).toBe(true);
    })
    test('toBeCloseTo',()=>{
        // expect(0.1 + 0.2).toBe(0.3)
        expect(0.1 + 0.2).toBeCloseTo(0.3)
    })
    test('toBeDefined',()=>{
        const obj = { name: 'jack'};
        expect(obj.name).toBeDefined();
    })
    test('toBeUndefined',()=>{
        const obj = { name: 'jack'};
        expect(obj.age).toBeUndefined();
    })
    test('toBeTruly',()=>{
        const obj = {name:'jack'};
        // false、0、''、null、undefined 和 NaN
        expect(obj).toBeTruthy();
    })
    test('toBeFalsy',()=>{
        const obj = null;
        expect(obj).toBeFalsy();
    })
    test('toBeNull',()=>{
        expect(getNull()).toBeNull();
    })
    test('toBeNaN',()=>{
        expect('k'/'').toBeNaN();
    })
    test('toBeTypeOf',()=>{
        expect('jack').toBeTypeOf('string')
    })
    test('toBeInstanceOf',()=>{
        class Apple {
            constructor(name){
                this.name = name;
            }
        }
        const apple = new Apple();
        expect(apple).toBeInstanceOf(Apple);
    })
    test('toBeGreaterThan',()=>{
        expect(1).toBeGreaterThan(0);
    })
    test('toBeGreaterThanOrEqual',()=>{
        expect(1).toBeGreaterThanOrEqual(1);
    })
    test('toEqual',()=>{
        const obj1 = {name:'jack'}
        const obj2 = {name:'jack'}
        expect(obj1).toEqual(obj2);
    })
    test('toContain',()=>{
        const str = 'hello world';
        const str2 = 'hello';
        expect(str).toContain(str2);

        const arr = [1,2,3];
        expect(arr).toContain(1);
    })
    test('toContainEqual',()=>{
        const arr = [{name:'jack'},{name:'bob'}];
        expect(arr).toContainEqual({name:'jack'});
    })
    test('toHaveLength',()=>{
        const arr = [1,2];
        expect(arr).toHaveLength(2)
    })
    test('toHaveProperty',()=>{
        const obj = {name:'jack'};
        expect(obj).toHaveProperty('name','jack')
    })
    test('toMatch',()=>{
        expect('hello world').toMatch(/hello/);
    })
    test('toMatchObject',()=>{
        const obj1 = {name:'jack',age:30};
        expect(obj1).toMatchObject({name:'jack'})
    })
    test('toThrowError',()=>{
        const fn = ()=>{
            throw new Error('hi')
        }
        expect(()=>fn()).toThrowError()
    })
})

