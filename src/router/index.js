import {createRouter, createWebHistory} from 'vue-router'
import HomeForm from '@/components/userForm/HomeForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import IndexForm from '@/components/userForm/IndexForm.vue'
import ShoppingForm from '@/components/userForm/shopping/ShoppingForm.vue'
import CartForm from "@/components/userForm/user/CartForm.vue";
import bookDetailForm from "@/components/userForm/shopping/BookDetailForm.vue";
import SelfForm from "@/components/userForm/user/SelfForm.vue";
import AddressForm from "@/components/userForm/user/AddressForm.vue";

const routes = [{
    path: '/shopping',
    name: 'shopping',
    component: HomeForm,
    redirect: '/shopping/index',
    children: [
        {
            path: 'index',
            name: 'index',
            component: IndexForm,
        }, {
            path: 'shoppingList',
            name: 'shoppingList',
            component: ShoppingForm,
        }, {
            path: 'bookDetail',
            name: 'bookDetail',
            component: bookDetailForm,
        }
    ]
}, {
    path: '/user',
    name: 'user',
    component: HomeForm,
    redirect: '/user/cart',
    children: [
        {
            path: 'cart',
            name: 'CartForm',
            component: CartForm,
        },{
            path: 'self',
            name: 'SelfForm',
            component: SelfForm,
        },{
            path: 'address',
            name: 'AddressForm',
            component: AddressForm,
        }
    ]
}, {
    path: '/login',
    name: 'login',
    component: LoginForm
}, {
    path: '/register',
    name: 'register',
    component: RegisterForm
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
