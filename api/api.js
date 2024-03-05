//封装api接口
import {request} from '@/api/request.js';

//查询会议纪要
export const list = (data={}) => {
    return request({
        url:'/GetConferenceList',
        method:'GET',
        data:data
    })
}
//新增会议记录
export const AddConference = (data={}) => {
    return request({
        url:'/AddConference',
        method:'POST',
        data:data
    })
}