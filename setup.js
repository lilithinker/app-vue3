import { beforeAll, vi } from "vitest";


console.log('************setup start****************')
beforeAll(()=>{
    console.log('do something beforeAll')
})

vi.stubGlobal('MYGLOBAL',{
    name:'jack',
    age: 30
})

console.log('************setup end******************')