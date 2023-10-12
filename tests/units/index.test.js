import { describe,expect,test } from "vitest";
import { hasOwnProperty ,getCurUrl,getGlobalName} from "@/utils/index.js";

describe('this is a learning test suit',()=>{
    // 测试上下文
    test('test ctx',(ctx)=>{
        expect(ctx.task.name).toBe('test ctx');
        expect(ctx.task.mode).toBe('run');
        expect(ctx.task.type).toBe('test');
    })
    // 自定义全局变量
    test('set global var by yourself',()=>{
        expect(getGlobalName('name')).toBe('jack');
        expect(getGlobalName('age')).toBe(30);

    })
    // 测试1个独立方法
    test('hasOwnProperty',()=>{
        const obj = {name:'jack'};
        expect(hasOwnProperty('name',obj)).toBe(true);
    })
    // 测试涉及window变量
    test('getCurUrl',()=>{
        expect(getCurUrl()).toBe('http://localhost:3000/')
    })
    // 测试test.extend 方法
    const todos = []
    const archive = []

    // 没有经过test.extend
    test('without test.extend',()=>{
        expect(todos.length).toBe(0)
    })

    const myTest = test.extend({
        todos: async ({ task }, use) => {
            todos.push(1, 2, 3)
            await use(todos)
            todos.length = 0
        },
        archive,
    })

    myTest('add item', ({ todos }) => {
        expect(todos.length).toBe(3)
        todos.push(4)
        expect(todos.length).toBe(4)
    })
    // after test.extend
    test('without test.extend',()=>{
        expect(todos.length).toBe(4)
    })

    // test.skip
    test('skip test',(ctx)=>{
        ctx.skip()
        expect(getGlobalName('age')).toBe(29)
    })

    // test.skipif 条件跳过
    const isTruely = false;
    test.skipIf(isTruely)('skip test if',()=>{
        expect(getGlobalName('age')).toBe(30)
    })

    // test.only 仅仅执行当前用例
    // test.only('test.only',()=>{
        // expect(getGlobalName('age')).toBe(30)
    // })

    // test.todo
    test.todo('待会儿再来看看这个问题')

    // 标识该测试用例是失败的
    function myAsyncFunc() {
    return new Promise(resolve => resolve(1))
    }
    test.fails('fail test', async () => {
    await expect(myAsyncFunc()).rejects.toBe(1)
    })
})