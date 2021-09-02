/*
 * @Description: 用户数据规则
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-09-02 15:39:43
 * @LastEditTime: 2021-09-02 16:56:17
 */

// 用户信息
const getUserInfo = {
    data: {
        id: '@id',
        username: '@cname',
        email: '@email',
        phone: /^1[3-9][0-9]{9}$/,
        'sex|0-1': 1
    }
}

// 注册
const signup = {
    data: getUserInfo.data,
    msg: '注册成功'
}

// 登录
const login = {
    data: getUserInfo.data,
    token: '@guid',
    msg: '登录成功'
}

// 登出
const logout = { msg: '注销登陆成功' }

// 重设密码
const resetPass = { msg: '修改密码成功' }

const User: IObj = {
    signup,
    login,
    getUserInfo,
    logout,
    resetPass
}

export default User