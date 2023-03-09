// 获取当前时间
function getNowDate() {
    var myDate = new Date();

    let y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)  
    let M = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月) 所以获取当前月份是 myDate.getMonth()+1;   
    let d = myDate.getDate(); //获取当前日(1-31)  
    let h = myDate.getHours(); //获取当前小时数(0-23)  
    let m = myDate.getMinutes(); //获取当前分钟数(0-59)  
    let s = myDate.getSeconds(); //获取当前秒数(0-59)  
    if (d < 10) {
        d = '0' + d
    }
    if (m < 10) {
        m = '0' + m
    }
    if (s < 10) {
        s = '0' + s
    }
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
}

const obj = {
    getNowDate
}

module.exports = obj

// var myDate = new Date();

// let y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
// let M = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月) 所以获取当前月份是 myDate.getMonth()+1;
// let d = myDate.getDate(); //获取当前日(1-31)
// let h = myDate.getHours(); //获取当前小时数(0-23)
// let m = myDate.getMinutes(); //获取当前分钟数(0-59)
// let s = myDate.getSeconds(); //获取当前秒数(0-59)
// if (d < 10) {
//     d = '0' + d
// }
// if (m < 10) {
//     m = '0' + m
// }
// if (s < 10) {
//     s = '0' + s
// }
// console.log(y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s)


