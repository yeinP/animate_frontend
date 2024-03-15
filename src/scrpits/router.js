import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Review from "@/pages/AdoptionReview/Review.vue";
import {createRouter, createWebHistory} from "vue-router";
import ShelterInfo from "@/pages/ShelterInfo.vue";
import RegisterStep1 from "@/pages/register/RegisterStep1.vue";
import RegisterStep2 from "@/pages/register/RegisterStep2.vue";
import Adoption from "@/pages/Adoption.vue";
import Miss from "@/pages/miss_report/Miss.vue";
import Mypage from "@/pages/Mypage.vue";
import AdoptionArticle from "@/pages/AdoptionReview/AdoptionArticle.vue";
import Notice from "@/pages/notice/Notice.vue";
import NoticeWrite from "@/pages/notice/NoticeWrite.vue";



const routes = [
    {path:'/', component: Home},
    {path:'/login', component: Login },
    {path: '/review', component: Review},
    {path: '/sheltersInfo', component: ShelterInfo},
    {path: '/register/step1', component: RegisterStep1},
    {path: '/register/step2', component: RegisterStep2},
    {path: '/animal/miss_care', component: Miss},
    {path: '/adoption', component: Adoption},
    {path: '/mypage', component: Mypage},
    { path: '/adoption/article/:arNo', name: 'AdoptionArticle', component: AdoptionArticle },
    { path: '/notice', name: 'Notice', component: Notice },
    { path: '/notice/write', name: 'NoticeWrite', component: NoticeWrite },


]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
