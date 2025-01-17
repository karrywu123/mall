import {createRouter, createWebHashHistory} from 'vue-router';
import Login from "../views/Login";
import OrderList from "../views/order/OrderList";
import AddProduct from "../views/product/AddProduct";
import BrandManage from "../views/product/BrandManage";
import ProductList from "../views/product/ProductList";
import CategoryManage from "../views/product/CategoryManage";
import Home from "../views/Home";
import ResultPage from "../views/result/ResultPage";
import UserManage from "../views/user/UserManage";
import OrderDetail from "../views/order/OrderDetail";
import EditProduct from "../views/product/EditProduct";
import ResetPassword from "../views/user/ResetPassword";
import MainPage from "../views/index/MainPage";
import OrderSet from "../views/order/OrderSet";

const routes = [
    {
        path: '/',
        component: Login,
    },
    {
        path: '/home',
        component: Home,
        redirect: '/main/page',
        children: [
            {
                path: '/main/page',
                name: 'mainPage',
                component: MainPage,
            },
            {
                path: '/product/list',
                name: 'productList',
                component: ProductList,
            },
            {
                path: '/product/add',
                name: 'addProduct',
                component: AddProduct,
            },
            {
                path: '/product/edit',
                name: 'editProduct',
                component: EditProduct,
            },
            {
                path: '/product/category',
                name: 'productCategory',
                component: CategoryManage,
            },
            {
                path: '/product/brand',
                name: 'productBrand',
                component: BrandManage,
            },
            {
                path: '/order/list',
                name: 'orderList',
                component: OrderList,
            },
            {
                path: '/order/set',
                name: 'orderSet',
                component: OrderSet,
            },
            {
                path: '/order/detail',
                name: 'orderDetail',
                component: OrderDetail,
            },
            {
                path: '/user/manage',
                name: 'userManage',
                component: UserManage,
            },
            {
                path: '/reset/password',
                name: 'ResetPassword',
                component: ResetPassword,
            },
            {
                path: '/result/page',
                name: 'resultPage',
                component: ResultPage
            }
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(), routes
})

export default router;