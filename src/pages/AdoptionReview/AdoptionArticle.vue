<template>
<div class="container">
  <div class="alter" v-if="isCurrentUserAuthor()">
    <div class="text">
      <button v-if="!isEditMode" @click="toggleEditMode">
        수정
      </button>
      <button @click=" deleteArticleWithImages(articleInfo.arNo)">
        삭제
      </button>
    </div>
  </div>
  <div class="article">
      <div class="titleBox">
        <div style="display: flex;justify-content: space-between; align-items: center;">
        <div v-html="insertSpaceInText(articleInfo.arTitle)" class="tb"></div>

        </div>
        <div>
          <div class="user">
            <div>
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            <span>{{articleInfo.userNickname}}</span>
            <span class="date">{{formattedDate}}</span>
            </div>
            <span><i class="fa fa-heart" aria-hidden="true" style="color: orangered" :likeCount = "likeCount"></i>{{ likeCount }}</span>
          </div>
        </div>
      </div>
    <div class="imgList">
      <div v-for="img in articleInfo.adoptionReviewImgList" :key="img">
        <img :src="img.arImgUrl" alt="Adoption Image"  class="img" id="img" />
      </div>
    </div>
    <div class="content">
      <div v-html="convertNewlines(articleInfo.arContent)"></div>
    </div>
  </div>
  <div class="box">
    <div class="replyBox">
      <input type="text" class="reply" v-model="reply" placeholder="댓글을 작성해주세요">
      <button type="button" class="btn-reply" @click="writeReply">작성</button>
    </div>
    <div class="replyBox-child">
      <div class="reply_" v-for="(reply, index) in replyList" :key="index">
        <div class="reply-info">

          <div class="nickname">{{ reply.userNickname }}<div v-if="reply.userNo == articleInfo.userNo" class="writer">작성자</div></div>
          <div class="re">{{ reply.reply }}</div>
          <div class="regdate">{{ formattedReplyDate(reply.replyDate) }}</div>
        </div>
        <div class="r-reply-box" >
          <div class="r-reply">
            <div class="r-open">
              <button @click="openReplyUpload(index)">답글</button>
            </div>
            <div class="r-r-box" v-if="reply.showReReplyBox">
              <input type="text" class="reply" v-model="arReReply" placeholder="댓글을 작성해주세요">
              <button type="button" class="btn-reply" @click="writeReReply(reply.arReplyNo)">답글</button>
            </div>
          </div>
        </div>
        <div v-for="reReply in reReplyList" :key="reReply" class="reReplyBox">
            <div v-if="reReply.arReplyNo === reply.arReplyNo" class="reReplyIf">
              <div class="icon">
                <i class="fa fa-terminal" aria-hidden="true"></i>
              </div>
              <div class="reNickname">{{reReply.userNickname}}
                <div v-if="reReply.userNo == reReplyList.userNo" class="writer">작성자</div>
              </div>
            <div class="reReply">{{reReply.arReReply}}</div>
            <div class="reRegdate">{{formattedReplyDate(reReply.arReReplyDate)}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>

</div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import router from "@/scrpits/router";
import {onMounted, ref} from "vue";
import store from "@/scrpits/store";

export default {
  name:'AdoptionArticle',
  setup(){
    const userNo = ref(store.state.user.userNo);
    onMounted(()=>{
      store.watch(()=> store.state.user.userNo,(newValue) =>{
        userNo.value = newValue;
      });
    });
    return { userNo };
  },
  props:['arImgList' , 'adoptionReview'],
  data(){
    return{
      arReplyDto: {
        arReplyNo: null,
        replyWriter: this.userNo,
        arNo: this.arNo,
        reply: null,
        replyDate: null,
      },
      arReReplyDto: {
          arReReplyNo: null,
          arReReplyWriter: this.userNo,
          arReplyNo: null,
          arReReplyDate: null,
          arReReply:null,
      },
      arNo :null,
      articleInfo:[],
      userNickname:null,
      likeCount: 0,
      replyList:[],
      reReplyList:[],

    }
  },
  computed:{
    formattedDate(){
      return moment(this.articleInfo.arRegdate).format('YYYY.MM.DD');
    }
  },
  mounted() {
    this.arNo = this.$route.params.arNo;
    this.getArticle(this.arNo);
    this.getLikesCount(this.arNo);
    this.getReplyList(this.arNo);
    this.getReReplyList(this.arNo);
    this.isCurrentUserAuthor();
  },
  methods:{
    deleteImages() {
      const fileNames = this.articleInfo.adoptionReviewImgList.map(img => {
            return img.arImgUrl.substring(img.arImgUrl.lastIndexOf('/') + 1);
      });
      const fileNameString = fileNames.join(',');

      axios.delete('/animate/delete/arImg', { fileName: fileNameString })
          .then(() => {
            console.log('이미지 삭제 완료');
          })
          .catch(error => {
            console.error('이미지 삭제 오류:', error);
          });
    },

    isCurrentUserAuthor() {
      return this.articleInfo.userNo === this.userNo;
    },
    formattedReplyDate(date){
      return moment(date).format('YYYY.MM.DD');
    },

    writeReply(){
      if (this.userNo) {
        this.arReplyDto.replyWriter = this.userNo;
        const requestData = {
          reply: this.reply,
          arNo: this.arNo,
          userNo: this.userNo,
        };
        axios.post('/animate/adoption/review/reply', requestData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          this.$router.go(0);
          this.reply = '';
          console.log("post" + response)
        })
            .catch(error =>{
              console.error(error);
            });
      } else {
        const loginAl = confirm("로그인 후 댓글 작성 가능합니다.");
        if(loginAl){
          router.push({path:'/login'});
        }
        console.error('userNo is null');
      }
    },
    writeReReply(arReplyNo) {
      console.log(arReplyNo);
      if (this.userNo) {
        this.arReReplyDto.arreplyWriter = this.userNo;
        const reReplyData = {
          arReReply: this.arReReply,
          arReplyNo: arReplyNo,  // Ensure replyNo is included in the request data
          userNo: this.userNo,
          arNo:this.arNo
        };

        axios.post('/animate/adoption/review/reply/re', reReplyData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          this.$router.go(0);
          console.log(response);
        }).catch(error => {
          console.error(error);
        });
      } else {
        const loginAl = confirm("로그인 후 댓글 작성 가능합니다.");
        if (loginAl) {
          router.push({path:'/login'});
        }
        console.error('userNo is null');
      }
    },
    convertNewlines(text) {
      if (text) {
        return text.replace(/\r?\n/g, "<br>");
      } else {
        return "";
      }
    },
    async getArticle(arNo) {
      try {
        const response = await axios.get(`http://localhost:9090/adoption/review/${arNo}`);
        this.articleInfo = response.data;
        console.log(response.data);

      } catch (error) {
        console.error("Error fetching article:", error);

      }
    },
    insertSpaceInText(text) {
      if (text) {
        return text.split('').join('&nbsp;');
      }
      return '';
    },
    async getLikesCount(arNo){
      try {
        const response = await fetch(`/animate/adoption/review/likecount/${arNo}`);
        const data = await response.json();
        this.likeCount = data;
      } catch (error) {
        console.error("Error fetching likes count:", error);
      }
    },
    getReplyList(arNo){
      axios.get(`http://localhost:9090/animate/adoption/review/reply/${arNo}`)
          .then(response => {
            this.replyList = response.data;

          })
          .catch(error => {
            console.error("댓글 가져오는 중 오류:", error);
          });
    },
    getReReplyList(arNo){
      axios.get(`http://localhost:9090/animate/adoption/review/reply/${arNo}/re`)
          .then(response =>{
            this.reReplyList = response.data;
            console.log(response.data);
          }).catch(error => {
        console.error("대댓글 가져오는 중 오류:", error);
      })
    },
    openReplyUpload(index) {
      const arReplyNo = this.replyList[index].replyNo;
      this.replyList.forEach((reply, i) => {
        if (i === index) {
          reply.showReReplyBox = !reply.showReReplyBox;
          this.arReplyNo = arReplyNo;
        } else {
          reply.showReReplyBox = false;
        }
      });
    },
    deleteNotice(arNo){
      axios.post(`/animate/adoption/delete/${arNo}`, {
        arNo: arNo // adoptionReview 객체에서 arNo 추출
      })
          .then(() => {
            router.push({path:'/review'});
          })
          .catch(error => {
            console.error("삭제 오류", error)
          })
    },
    deleteArticleWithImages(arNo) {
      this.deleteImages();
      this.deleteNotice(arNo);
    }

  }
}

</script>

<style scoped>
.container{
  margin-top: 50px;

}
.titleBox .tb{
  margin-top: 20px;
}
.titleBox {
  margin: 20px;
  width: 100%;
  height:100%;
  border-bottom: 1px solid #cccb65;
  border-top: 1px solid #cccb65;
  color: rgba(0, 0, 0, 0.75);
  font-weight: bold;
  font-size:30px;
}
.titleBox div{
}
.user{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:#6b6b6b;
  font-size:15px;
  margin: 10px 0 20px 5px;
}
.user span{
  color:#6b6b6b;
  font-size:18px;
}
.user i{
  margin: 0 5px 0 0;
  font-size:18px;
}
.date{
  margin: 0  0 0 20px;
  color:#6b6b6b;
  font-size:18px;
  font-weight: normal;

}
.imgList{
  text-align: center;
}
.img {
  width: 250px;
  height: 250px;
  margin:0 0 10px 0;
}
.content{
  text-align: center;
  font-size:20px;
  margin: 0 0 10px 0;
}
.article{
  border-bottom: 1px solid #cccb65;
  margin:  0 0 10px 0;
}
.reply{
  width: 89%;
  padding: 5px;
  font-size: 15px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 4px

}

.replyBox{
}

.btn-reply{
  margin: 0 0 0 10px;
  width: 10%;
  height: 35px;
  background-color: rgb(108, 108, 105);
  border: 0;
  color: #fff;
  border-radius: 4px;

}
.reply_{
  width: 100%;
  display: flex;
  border-bottom: #d6d6d6 1px solid;
  padding: 0.5rem 0 0.5rem 0;
  flex-direction: column;
}
.nickname {
  flex: 0.5;
  font-weight: bolder;
  margin:0 0 0 3%;
}

.reNickname {
  flex: 0.5;
  font-weight: bolder;
  margin:0 0 0 0;
}


.re, .reReply{
  flex:3;
  overflow-wrap: anywhere;
  margin:auto;
}
.regdate, .reRegdate{
  flex:0.5;
  text-align: center;
  margin: auto;
  font-size:13px;
}

.replyBox-child{
  margin: 0.5rem 0 0 0;
  background-color: #cfce5e29;
  border-radius: 0.5rem;
  overflow-y: auto;
  max-height: 550px;
}

.replyBox-child .reply_:last-child {
  border-bottom: none;
}

.reply-info{
  display: flex;
}
.r-reply{
  display: flex;
  font-size: 13px;
  margin:0.3rem 0 0.3rem 3%;
  align-items: center;
}
.r-open button{
  background-color: #cfce5e29;
  border: 0.5px solid #cccccc;

}

.r-r-box{
  margin: 0.5rem;
  flex:1;
  display: flex;
  align-items: center;
}
.r-r-box button{
  width: 7%;

}
.r-reply-box{


}
.reReply{

}
.reReplyIf{
  width: 100%;
  display: flex;
//border-bottom: #d6d6d6 1px solid;
  padding: 0.2rem 0 0.2rem 0;

}

.reReplyBox{
  margin: 0 3% 0 3%;
  background-color: rgba(214, 214, 214, 0.51);
}

.icon{
  font-weight: bolder;
  margin: 0 0 0 3%;
}

.writer{
  font-weight: 100;
  font-size: 11px;
}
</style>