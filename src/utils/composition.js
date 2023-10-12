import { onMounted, ref } from 'vue';
import axios from 'axios';

export function useCounter(){
    const counter = ref(0)
    const fn = {
        increase(){
            counter.value++;
        }
    }
    return {
        ...fn,
        counter
    }
}

export function useUser(userId){
    const user = ref();
    const fetchUser = ()=>{
        axios.get(`users/${userId}`).then(res=>{
            user.value = res.data;
        })
    }

    onMounted(()=>{
        fetchUser(userId);
    })

    return {
        user
    }
}