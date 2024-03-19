<template>
  <div class="container">
    <div class="mb-4 rounded text-body-emphasis bg-body-secondaryy">
      <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/img/home/main1.jpg" class="car-img">
            <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="rgba(204,204,102)"/></svg>
            <div class="container">
              <div class="carousel-caption text-start" style="font-family: 'Gamja Flower', sans-serif;">
                <h1>Animate</h1>
                <p class="opacity-75">Animate는 유기견 및 유기묘 등 다양한 유기동물 아이들과 함께합니다.</p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/img/home/main2.jpg" class="car-img">
            <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="rgba(204,204,102)"/></svg>
            <div class="container">
              <div class="carousel-caption" style="font-family: 'Gamja Flower', sans-serif;">
                <h1>같이</h1>
                <p>아이들과 같이 살아가요</p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/img/home/main3.jpg" class="car-img">
            <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="rgba(204,204,102)"/></svg>
            <div class="container">
              <div class="carousel-caption text-end" style="font-family: 'Gamja Flower', sans-serif;">
                <h1>행복</h1>
                <p>행복한 순간을 함께 만들어가요</p>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

    </div>
    <div class="recent">
      <span class="fst-italic">최근 올라온 실종/제보</span>
    </div>
    <div class="row mb-3">
      <div class="col-md-4" v-for="(recentmc, index) in displayedMissCareList" :key="index">
        <RecentMC :recentmc="recentmc" />
      </div>
    </div>

    <div class="row g-5">
      <div class="col-md-8">
        <h3 class="pb-4 mb-4 fst-italic border-bottom">
          공지사항
        </h3>
        <div class=" pb-4 border-bottom">
          <ul>
            <li v-for="(notice, index) in noticeList.slice(0, 10)" :key="index" class="noticeLi" @click="goArticle(notice)">{{ notice.noticeTitle }}</li>
          </ul>
        </div>

      </div>
      <div class="col-md-4">
        <div class="position-sticky" style="top: 2rem;">
          <div class="p-4 mb-3 bg-body-tertiary rounded">
            <h4 class="fst-italic">About</h4>
            <p class="mb-0">유기동물과 함께할 반려인을 기다립니다.</p>
            <p>잃어버린 아이들의 반려인을 찾아주세요.</p>
          </div>

          <div>
            <h4 class="fst-italic">인기 입양 후기</h4>
            <ul class="list-unstyled">
              <li v-for="(review, index) in bestReviewList" :key="review.arNo">
                <Top3Review :bestReview = "review" :index = "index"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>



import RecentMC from "@/components/home/RecentMC.vue";
import axios from "axios";
import Top3Review from "@/components/home/Top3Review.vue";
import router from "@/scrpits/router";


export default {
  name: "Home",
  components: {
    RecentMC,
    Top3Review,
  },
  data(){
    return{
      missCareList:[],
      bestReviewList:[],
      noticeList:[],
    }
  },
  computed:{
    displayedMissCareList() {
      return this.missCareList.slice(0, 3);
    },

  },
  mounted() {

  },
  created() {
    this.getMissCareDtoList();
    this.getBestReview();
    this.getNoticeList();
  },
  methods:{
    getMissCareDtoList(){
      axios.get('http://localhost:9090/animal/miss_care')
          .then((response) => {
            this.missCareList = response.data;

          })
          .catch((error) => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
          });
    },
    getBestReview(){
      axios.get('http://localhost:9090/home/review/best')
          .then((response) => {
            this.bestReviewList = response.data;
          })
          .catch((error) => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
          });
    },
    getNoticeList(){
      axios.get('http://localhost:9090/notice/list')
          .then((response) => {
            this.noticeList = response.data;
            console.log(response.data);
          }).catch((error)=>{
        console.error("데이터 오류" , error);
      })

    },
    goArticle(notice){
      axios.post(`/animate/notice/${notice.noticeNo}/increaseCount`)
          .then(() => {
            router.push({
              name: 'NoticeArticle',
              params: { noticeNo: notice.noticeNo }
            });
          })
          .catch(error => {
            console.error("조회수 증가 오류", error);
          });


    },


  },

}

</script>

<style scoped>
.btn{
  --bs-btn-active-bg: #c7c508;
  --bs-btn-active-border-color:  #c7c508;
}
.recent{
  text-align: center;
  font-size: 1.5rem;
  padding: 1.5rem;
  font-weight: 500;
}
.fst-italic{
  font-weight: bold;
  font-size: 20px;
}
ul{

}
li::marker{
  color:#c7c508;
}
.noticeLi{
  cursor: pointer;
}

.noticeLi:hover{
  font-weight: bold;
}
.carousel-caption h1{
  font-size: 60px;
}
.carousel-caption p{
  font-size:30px;
}
</style>