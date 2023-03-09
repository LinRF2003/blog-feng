// 页面弹出消息封装
import { Message } from 'element-ui';

const message = {
    error: (msg) => {
        Message({
            message: msg,
            type: 'error',
            duration: 2000,
        })
    },
    success: (msg) => {
        Message({
            message: msg,
            type: 'success',
            duration: 2000,
        })
    },
    warning: (msg) => {
        Message({
            message: msg,
            type: 'warning',
            duration: 2000,
        })
    }
}

export default message;