import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { useCounter,useUser } from "@/utils/composition";
import { createApp, defineComponent, h, inject } from "vue";
import { flushPromises, mount } from "@vue/test-utils";
import ProvideTest from '@/components/ProvideTest.vue';
import ProvideGlobal from '@/components/ProvideGlobal.vue';
import { createStore } from "vuex";

describe('测试一下组合式api',()=>{
    test('useCounter',()=>{
        const { counter, increase } = useCounter();
        expect(counter.value).toBe(0);
        increase();
        expect(counter.value).toBe(1)
    })

    test('useUser',async ()=>{
        vi.spyOn(axios,'get').mockResolvedValue({data:{id:1,name:'jack'}})
        const TestComponent = defineComponent({
            props:{
                userId:{
                    type:Number,
                    required:true
                }
            },
            setup(props){
                return {
                    ...useUser(props.userId)
                }
            }
        })

        const wrapper = mount(TestComponent,{
            props:{
                userId:1
            }
        })
        expect(wrapper.vm.user).toBeUndefined();
        await flushPromises()
        expect(wrapper.vm.user).toEqual({id:1,name:'jack'})
    })

    test('Provide',()=>{
        const TestComponent = defineComponent({
            template:`<span id="provide-test" >{{value}}</span>`,
            setup(){
                const value = inject('my-key');
                return {
                    value
                }
            }
        })

        const wrapper = mount(ProvideTest,{
            slots:{
                default:()=>h(TestComponent)
            }
        })
        expect(wrapper.find('#provide-test').text()).toBe('some-data')
    })

    test('模拟一个全局子组件验证provide',()=>{
        const TestComponent = defineComponent({
            template:`<span id="provide-test" >{{value}}</span>`,
            setup(){
                const value = inject('my-key');
                return {
                    value
                }
            }
        })
        const wrapper = mount(ProvideGlobal,{
            global:{
                stubs:{
                    SomeChild: TestComponent
                }
            }
        })

        expect(wrapper.find('#provide-test').text()).toBe('some-data')
    })

    test('模拟一个provide验证inject', ()=>{
        const TestComponent = defineComponent({
            template:`<span id="provide-test" >{{value}}</span>`,
            setup(){
                const value = inject('my-key');
                return {
                    value
                }
            }
        })
        const wrapper = mount(TestComponent,{
            global:{
                provide:{
                    'my-key':'my-data'
                }
            }
        })
        expect(wrapper.find('#provide-test').text()).toBe('my-data')
    })

    test("测试v-model",async ()=>{
        const Editor = {
            props: {
                label:String,
                modelValue: String,
            },
            emits: ['update:modelValue'],
            template:`
                <div>
                <label>{{label}}</label>
                <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
                </div>
            `
        }


        const wrapper = mount(Editor,{
            props:{
                modelValue:'initText',
                'onUpdate:modelValue':e=>wrapper.setProps({modelValue:e})
            }
        })

        await wrapper.find('input').setValue('test');
        expect(wrapper.props('modelValue')).toBe('test')
    })

    test('测试vuex,相对真实场景',async ()=>{
        const store = createStore({
            state(){
                return {
                    count:0
                }
            },
            mutations:{
                add(state){
                    state.count += 1;
                }
            }
        })
        const App = {
            template:`<div @click="addCount">{{$store.state.count}}</div>`,
            methods:{
                addCount(){
                    this.$store.commit('add');
                }
            }
        }

        const app = createApp(App);
        app.use(store);

        const wrapper = mount(App,{
            global:{
                plugins:[store]
            }
        })
        expect(wrapper.find('div').text()).toBe('0')
        await wrapper.find('div').trigger('click');
        expect(wrapper.find('div').text()).toBe('1')
    })

    test('模拟部分store',async ()=>{
        const App = {
            template:`<div @click="addCount">{{$store.state.count}}</div>`,
            methods:{
                addCount(){
                    this.$store.commit('add');
                }
            }
        }
        const $store = {
            state:{
                count:25,
            },
            commit:vi.fn()
        }
        const wrapper = mount(App,{
            global:{
                mocks:{
                    $store
                }
            }
        })
        await wrapper.find('div').trigger('click');
        expect(wrapper.find('div').text()).toBe('25')
        expect($store.commit).toHaveBeenCalled()
    })

    test('单独测试store',()=>{
        const store = createStore({
            state:{
                count:0
            },
            mutations:{
                increase(state){
                    state.count+=1;
                }
            }
        })
        store.commit('increase');
        expect(store.state.count).toBe(1)
    })
})