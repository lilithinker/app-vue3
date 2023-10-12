// 这是一个工具文件

export function getCurUrl(){
    return window.location.href;
}

export function hasOwnProperty(key, obj){
    return Object.prototype.hasOwnProperty.call(obj, key);
}

export function getGlobalName(key){
    return MYGLOBAL[key]
}

export function isBiger(num){
    if(num<10){
        return true;
    }else{
        return false;
    }
}

export function getNull(){
    return null;
}