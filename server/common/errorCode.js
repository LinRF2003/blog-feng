
const PARAMS_ERROR = {
    code: 400, message: "请求参数错误"
};
const NULL_ERROR = {
    code: 401, message: "请求数据为空"
};

const NO_LOGIN = {
    code: 302, message: "未登录"
};
const NO_AUTH = {
    code: 402, message: "无权限"
};
const SYSTEM_ERROR = {
    code: 500, message: "系统内部异常"
};

module.exports = {
    PARAMS_ERROR,
    NULL_ERROR,
    NO_LOGIN,
    NO_AUTH,
    SYSTEM_ERROR
}