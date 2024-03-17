<template>

  <div class="click" @click="goArticle(bestReview)">
    <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top">
     <div class="rank">{{  index + 1 }}</div>
      <svg class="bd-placeholder-img" width="120%" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="100%" height="100%" fill="#ffff"/>
        <image :href="bestReview.arImgUrl" x="10%"  width="80%" height="100%" preserveAspectRatio="xMidYMid slice"></image>
      </svg>

      <div class="col-lg-8">
        <div class="like"><i class="fa fa-heart" aria-hidden="true"></i><span>{{ bestReview.likeCount }}</span></div>
        <h6 class="mb-0">{{ bestReview.arTitle }}</h6>
        <small class="text-body-secondary">{{formattedDate}}</small>
      </div>
    </a>
  </div>
</template>

<script>
import moment from "moment";
import router from "@/scrpits/router";

export default {
  name: "Top3Review",
  props:['bestReview', 'index'],
  computed:{
    formattedDate(){
      return moment(this.bestReview.arRegdate).format('YYYY.MM.DD');
    },
  },
  methods:{
    goArticle(bestReview){
      router.push({
        name: 'AdoptionArticle',
        params:{arNo:bestReview.arNo}
      });


    },
  }
}

</script>

<style scoped>
.gap-3 {
  gap: 0.5rem;
}


.col-lg-8 {
  height: 150px;
  flex: 0 1 auto;
  width: 66.66666667%;
}
i{
  color: #ff5656;
  margin: 0.3rem 0.3rem 0 0;
}
.like{
  margin: 0 0 2rem 0;
  align-items: center;
  display: flex;
  justify-content: flex-end;

}
.col-lg-8{
  display: flex;
  flex-direction: column;
}

.mb-0{
  font-size: 18px;
  font-weight: 600;
  padding: 0 0 0.3rem 0;
}
.click{
  cursor: pointer;
}
.rank{
  font-size: 20px;
  color: white;
  background-color: #dedd65;
  padding:0.5rem 1rem;
  border-radius: 2rem;
}
</style>