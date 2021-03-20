// let host = 'http://182.92.0.242:86'
let host = 'http://glasses.kokou.cn'

export default {
    code: `${host}/api/v1/wechat/code`, //授权code登录
    openid: `${host}/api/v1/login/openid`, //授权openid登录
    home: `${host}/api/v1/page/home`, //获取首页信息
    sidebar: `${host}/api/v1/page/sidebar`, //获取公共侧边栏
    get_goods: `${host}/api/v1/page/get_goods`, //查看单个产品信息

    shop_add: `${host}/api/v1/shop/add`, //添加到购物车
    shop_list: `${host}/api/v1/shop/list`, //购物车列表
    shop_delete: `${host}/api/v1/shop/delete`, //删除购物车
    shop_count: `${host}/api/v1/shop/count`, //购物车查看数量

    save_lens: `${host}/api/v1/shop/save_lens`, //添加镜片
    del_lens: `${host}/api/v1/shop/del_lens`, //删除
    lens_list: `${host}/api/v1/lens/list`, //获取镜片,

    addr_default: `${host}/api/v1/addr/default`, //获取默认地址,
    addr_add: `${host}/api/v1/addr/add`, //添加
    addr_list: `${host}/api/v1/addr/list`, //获取列表,
    addr_delete: `${host}/api/v1/addr/delete`, //删除,
    addr_update: `${host}/api/v1/addr/update`, //修改地址,

    pay: `${host}/api/v1/pay`, //支付
    pay_find: `${host}/api/v1/order/find`, //公众号查询是否支付成功


    case: `${host}/api/v1/page/case`, //获取分类下的产品
    upload: `${host}/api/v1/image/upload`, //上传图片
    add: `${host}/api/v1/number/add`, //添加自己的度数
    list: `${host}/api/v1/number/list`, //度数管家列表

    mobile: `${host}/api/v1/bind/mobile`, //绑定手机号
    mobileCode: `${host}/api/v1/send/code`, //发送验证码

    orderList: `${host}/api/v1/order/list`, //我的订单
    orderInfo: `${host}/api/v1/order/info`, //订单详情
    orderUpdate: `${host}/api/v1/order/update`, //订单关联度数管家


}