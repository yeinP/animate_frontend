<template>
  <div class="container">
    <header class="lh-1 py-3">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <div class="col-4 pt-1">
        </div>
        <div class="col-4 text-center">
        </div>
        <div class="col-4 d-flex justify-content-end align-items-center">
          <div  v-if="!userNo">
          <router-link to="/login" class="btn btn-sm">로그인</router-link>
          <router-link to="/register/step1" class="btn btn-sm">회원가입</router-link>
          </div>
          <div v-else>
            <router-link to="/login" class="btn btn-sm" @click="logout" >로그아웃</router-link>
            <router-link to="/mypage" class="btn btn-sm">마이페이지</router-link>
          </div>
        </div>
      </div>
      <div class="siteTitle">
        <div class="text-center">
          <a class="blog-header-logo text-body-emphasis text-decoration-none" href="/"><img src="/img/home/logo.jpg" ></a>
        </div>
      </div>
    </header>
    <div class="nav-scroller py-1 mb-3 ">
      <nav class="nav nav-underline justify-content-between">
        <a class="nav-item link " href="#">Animate 소개</a>
        <a class="nav-item link " href="/sheltersInfo">보호소 찾기</a>
        <a class="nav-item link " href="/animal/miss_care">실종/목격 제보</a>
        <a class="nav-item link " href="/adoption">입양</a>
        <a class="nav-item link " href="/review">입양후기</a>
        <a class="nav-item link " href="/notice">공지</a>
      </nav>
    </div>
  </div>

</template>

<script>
import router from "@/scrpits/router";
import store from "@/scrpits/store";
import {onMounted, ref} from "vue";

export default {
  name: 'Header',
  setup(){
    const userNo = ref(store.state.user.userNo);
    const logout =() => {
      store.commit('setUser', 0);
      sessionStorage.removeItem("userNo");
      router.push({path:'/'});
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    onMounted(()=>{
      store.watch(()=> store.state.user.userNo,(newValue) =>{
        userNo.value = newValue;
      });
    });
    return {userNo,logout}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.link {
  font-family: "Gamja Flower", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
   display: block;
   padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
   font-size: var(--bs-nav-link-font-size);
   font-weight: var(--bs-nav-link-font-weight);
  color: #cfce5e;
   text-decoration: none;
   background: 0 0;
   border: 0;
   transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: #a2a142;
 }

.nav-scroller .nav {
  font-weight: 900;
  font-size: 30px;
}

.py-1 {
  padding: 0 0.25rem 0;
}
.container[data-v-61dd7a3d] {
  height: 230px;
}

.nav-scroller {
  width: 900px;
  margin: auto;
  position: relative;
  z-index: 2;
  height: 3rem;
  overflow-y: hidden;
}

</style>
