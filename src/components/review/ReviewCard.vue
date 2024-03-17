<template>
  <div class="card shadow-sm">
    <div class="card-body1">
      <div class="tiNi">
        <div class="title">{{ adoptionReview.arTitle }}</div>
        <div class="user">
          <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          <span>{{adoptionReview.userNickName}}</span>
        </div>
      </div>
      <div class="date">{{formattedDate}}</div>
    </div>
    <div class="bd-placeholder-img card-img-top" width="100%" height="225">
      <div class="imgList">
        <div v-for="arImg in getImagesForAdoptionReview(adoptionReview.arNo)" :key="arImg.arImgNo">
          <img :src="arImg.arImgUrl" alt="Adoption Image"  class="img"/>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text" @click="goArticle(adoptionReview)" style="cursor: pointer">{{ truncateText(adoptionReview.arContent, 30) }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="clickLike(adoptionReview.arNo)">
            <div v-if="lStatus == 'N' || lStatus == null"><i class="fa fa-heart-o" aria-hidden="true" ></i><span>좋아요</span></div>
            <div v-else><i class="fa fa-heart" aria-hidden="true"></i><span>좋아요</span></div>

          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="goArticle(adoptionReview)"><i class="fa fa-commenting-o" aria-hidden="true"></i>댓글보기</button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import moment from "moment/moment";
import { onMounted, ref, toRaw} from "vue";
import axios from "axios";
import router from "@/scrpits/router";
import store from "@/scrpits/store";


export default {
  name: 'ReviewCard',
  props:['adoptionReview','arImgList'],
  computed:{
    formattedDate(){
      return moment(this.adoptionReview.arRegdate).format('YYYY.MM.DD');
    }
  },
  setup(){
    const userNo = ref(store.state.user.userNo);
    onMounted(()=>{
      store.watch(()=> store.state.user.userNo,(newValue) =>{
        userNo.value = newValue;
      });
    });
    return { userNo };
  },
  data(){
    return{
      lStatus: 'N'
    }
  },
  mounted() {
    this.checkLikeStatus(this.adoptionReview.arNo);
  },
  methods:{
    truncateText(text, length) {
      if (text.length > length) {
        return text.substring(0, length) + ' ...더보기';
      } else {
        return text;
      }
    },
    getImagesForAdoptionReview(arNo) {
     const rawArray = toRaw(this.arImgList);
      const filteredImages = rawArray.filter((arImg) => arImg.arNo == arNo);

      return filteredImages;
    },
    async toggleLike(arNo) {
      if (this.userNo) {
        try {
          const response = await axios.post(`/animate/adoption/review/like?arNo=${arNo}`, null);
          if (response.status === 200) {
            window.location.reload();
          } else {
            console.error("Failed to add like");
          }
        } catch (error) {
          console.error("Error adding like:", error);
        }
      } else {
        const loginAlert = confirm("로그인 후 가능합니다.");
        if (loginAlert) {
          await router.push({ path: '/login' });
        }
        console.error('userNo is null');
      }
    },
    async checkLikeStatus(arNo) {
      try {
        const response = await axios.get(`/animate/adoption/review/like/${arNo}`);
        console.log(response.data);
        this.lStatus = response.data;
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    },
    async clickLike(arNo) {
      await this.toggleLike(arNo);
    },
    goArticle(adoptionReview){
      router.push({
        name: 'AdoptionArticle',
        params:{arNo:adoptionReview.arNo}
      });


    }

  }
}
</script>

<style scoped>
.imgList{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.card-body .d-flex{
  flex-direction: row-reverse;
}

.card-body1{
  align-items: flex-end;
  flex: 1 1 auto;
  padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
  color: var(--bs-card-color);
  display: flex;
  justify-content: space-between;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.card-img-top{
  background-color: gainsboro;
}
.img{
  width: 150px;
  height: 150px;
  margin:0.5rem 0.3rem 0.3rem 0.5rem;
}

.imgList{
  overflow-x: scroll;
}


::-webkit-scrollbar-thumb {
  background-color: rgba(121, 133, 112, 0.7);
  border-radius: 6px; /* 스크롤바의 모서리를 둥글게 만듭니다. */
}

/* 스크롤바가 트랙을 가리키는 부분의 스타일링 */
::-webkit-scrollbar-track {
  background-color: #ffffff; /* 스크롤바 트랙의 색상 */
}

.title{
  font-weight: bolder;
  font-size:20px;
}

.user{
  display: flex;
  align-items: center;
  color:#6b6b6b;
  font-size:15px;
}
.user i{
  margin: 0 5px 0 0;
  font-size:18px;
}


</style>