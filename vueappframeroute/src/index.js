import appframe from './appframe.vue'
import page404 from './404.vue'
import Home from './home.vue'

Vue.use(VueRouter)

//存放已经加载的组件，防止重复加载组件js
let allcomps = new Set()
//组件信息（由后台返回，根据各个模块信息组成）
Vue.prototype.$allcomponent = [{
        name: 'comp1', //name 是组件在全局window上的引用
        path: "/comp1/home", //path 用于导航地址，以及表示组件在系统中的规划等级（一二三级导航对应各种组件）
        url: "http://localhost:8001/comp1.js" // url 组件的地址
    },
    {
        name: 'comp3',
        path: "/comp3/home",
        url: "http://localhost:8001/comp3.js"
    },
    {
        name: 'comp2',
        path: "/comp2/home",
        url: "http://localhost:8002/comp2.js"
    }
]

//自定义异步导航方法
Vue.prototype.$irouter = route => {
    //根据path找到对应的组件
    let comp = Vue.prototype.$allcomponent.find(c => c.path == route)
    if (!comp) {
        //没有匹配到组件的导航到404或主页
        if (route == '/') {
            frameapp.$router.push('/')
        } else {
            frameapp.$router.push('/404')
        }
    } else {
        //创建一个最新的导航状态key
        let currentRouteKey = Math.random()
        //设置全局导航状态key为最新
        window.newRouteKey = currentRouteKey
        return new Promise((resolve, reject) => {
            if (!allcomps.has(comp.name)) {
                //添加script标签加载组件js
                //发现重复加载时，先删除原来的再加载
                document.querySelectorAll('script').forEach(s => {
                    if (s.src == comp.url) {
                        s.parentNode.removeChild(s)
                    }
                })
                let scriptcom = document.createElement("script")
                scriptcom.src = comp.url
                document.querySelector('head').appendChild(scriptcom)
                //js加载完成全局变量中组件变量存在后开始添加路由，并导航
                let now = new Date().getTime()
                let timer = () => {
                    if (!window[comp.name]) {
                        if (currentRouteKey == window.newRouteKey) {
                            if ((new Date().getTime() - now) / 1000 < 5) {
                                setTimeout(timer, 1)
                            } else {
                                console.error(`组件${comp.name}加载超时`)
                                frameapp.$router.push('/404')
                            }
                        } else {
                            console.log(`取消导航到${comp.name}`)
                        }
                    } else {
                        //添加路由,标记组件已加载
                        allcomps.add(comp.name)
                        console.log(`${comp.name}加载完成`)
                        frameapp.$router.addRoutes([{
                            path: comp.path,
                            component: window[comp.name]
                        }])
                        frameapp.$router.push(comp.path)
                        resolve()
                    }
                }
                timer()
            } else {
                //已加载组件，直接导航
                frameapp.$router.push(comp.path)
                resolve()
            }
        })
    }
}

//添加路由
const router = new VueRouter({
    routes: [{
        path: '/',
        component: Home
    }, {
        path: '/404', // 用于显示没有匹配到的页面
        component: page404,
    }]
})


//后期想修改成，使用vuerouter 只不过组件动态加载 去掉自定义的irouter
router.beforeEach((to, from, next) => {
    let comp = Vue.prototype.$allcomponent.find(c => c.path == to.path)
    if (comp) {
        setTimeout(_ => {
            //第一次进入路由还未加载组件
            if (!allcomps.has(comp.name)) {
                frameapp.$irouter(to.path)
            } else {
                next()
            }
        }, 0)
    } else if (to.path == '/' || to.path == '/404') {
        next()
    } else {
        next('/404')
    }
})

let app = new Vue({
    el: '#app',
    router,
    template: '<appframe />',
    components: {
        appframe
    }
})

window.frameapp = app
