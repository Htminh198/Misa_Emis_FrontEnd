import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import MissionAllowanceView from '@/views/management-request/mission-allowance/MissionAllowanceView'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/management-request/mission-allowance',
            name: 'MissionAllowanceView',
            component: MissionAllowanceView
        }
    ],
    mode: 'history'
})
