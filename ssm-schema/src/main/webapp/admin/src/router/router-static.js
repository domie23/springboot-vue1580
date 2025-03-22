import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
import adminexam from '@/views/modules/shijuanliebiao/exam'
    import news from '@/views/modules/news/list'
    import lunbotuguanli from '@/views/modules/lunbotuguanli/list'
    import kefuguanli from '@/views/modules/kefuguanli/list'
    import shangpinxinxi from '@/views/modules/shangpinxinxi/list'
    import yifahuodingdan from '@/views/modules/yifahuodingdan/list'
    import shangpinruku from '@/views/modules/shangpinruku/list'
    import huiyuan from '@/views/modules/huiyuan/list'
    import yiwanchengdingdan from '@/views/modules/yiwanchengdingdan/list'
    import storeup from '@/views/modules/storeup/list'
    import users from '@/views/modules/users/list'
    import weizhifudingdan from '@/views/modules/weizhifudingdan/list'
    import yiquxiaodingdan from '@/views/modules/yiquxiaodingdan/list'
    import liuyanbanguanli from '@/views/modules/liuyanbanguanli/list'
    import yizhifudingdan from '@/views/modules/yizhifudingdan/list'
    import shangpinfenlei from '@/views/modules/shangpinfenlei/list'
    import xiaoshoutongji from '@/views/modules/xiaoshoutongji/list'
    import shangpinchuku from '@/views/modules/shangpinchuku/list'
    import yituikuandingdan from '@/views/modules/yituikuandingdan/list'

//2.配置路由   注意：名字
const routes = [
    {
        path: '/index', name:'index', component: Index, children: [{
            // 这里不设置值，是把main作为默认页面
            path: '/',
            name: 'home',
            component: Home
        },{
            path: '/updatePassword',
            name: 'updatePassword',
            component: UpdatePassword
        } ,{
            path: '/pay',
            name: 'pay',
            component: pay
        } ,{
            path: '/center',
            name: 'center',
            component: center
        } 
                    ,{
                path: '/news',
                name: 'news',
                component: news
            } 
                    ,{
                path: '/lunbotuguanli',
                name: 'lunbotuguanli',
                component: lunbotuguanli
            } 
                    ,{
                path: '/kefuguanli',
                name: 'kefuguanli',
                component: kefuguanli
            } 
                    ,{
                path: '/shangpinxinxi',
                name: 'shangpinxinxi',
                component: shangpinxinxi
            } 
                    ,{
                path: '/yifahuodingdan',
                name: 'yifahuodingdan',
                component: yifahuodingdan
            } 
                    ,{
                path: '/shangpinruku',
                name: 'shangpinruku',
                component: shangpinruku
            } 
                    ,{
                path: '/huiyuan',
                name: 'huiyuan',
                component: huiyuan
            } 
                    ,{
                path: '/yiwanchengdingdan',
                name: 'yiwanchengdingdan',
                component: yiwanchengdingdan
            } 
                    ,{
                path: '/storeup',
                name: 'storeup',
                component: storeup
            } 
                    ,{
                path: '/users',
                name: 'users',
                component: users
            } 
                    ,{
                path: '/weizhifudingdan',
                name: 'weizhifudingdan',
                component: weizhifudingdan
            } 
                    ,{
                path: '/yiquxiaodingdan',
                name: 'yiquxiaodingdan',
                component: yiquxiaodingdan
            } 
                    ,{
                path: '/liuyanbanguanli',
                name: 'liuyanbanguanli',
                component: liuyanbanguanli
            } 
                    ,{
                path: '/yizhifudingdan',
                name: 'yizhifudingdan',
                component: yizhifudingdan
            } 
                    ,{
                path: '/shangpinfenlei',
                name: 'shangpinfenlei',
                component: shangpinfenlei
            } 
                    ,{
                path: '/xiaoshoutongji',
                name: 'xiaoshoutongji',
                component: xiaoshoutongji
            } 
                    ,{
                path: '/shangpinchuku',
                name: 'shangpinchuku',
                component: shangpinchuku
            } 
                    ,{
                path: '/yituikuandingdan',
                name: 'yituikuandingdan',
                component: yituikuandingdan
            } 
                ]
    },
    { path: '/adminexam', name: 'adminexam', component: adminexam },
    { path: '/login', name:'login', component: Login },
    { path: '/register', name:'register', component: register },
    { path: '/', redirect: '/index/' },      /*默认跳转路由*/
    { path: '*', component: NotFound }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
    mode: 'hash',   /*hash模式改为history*/
    routes // （缩写）相当于 routes: routes
})

export default router;

