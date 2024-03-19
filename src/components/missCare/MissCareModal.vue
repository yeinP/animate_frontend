
<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="closeBtn">
        <div :class="msStatusClass">{{mcStatusLabel}}</div>
        <span>{{missCare.mcBreed}}</span>
      <button @click="closeModal"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
      </div>
      <div class="box">
        <div class="content">
        <div class="animal-info">
          <div id="myCarousel" class="carousel slide mb-6" >
            <div class="carousel-indicators">
              <button v-for="(item, index) in missCareImgList" :key="index" type="button" data-bs-target="#myCarousel" :data-bs-slide-to="index" :class="{ 'active': index === 0 }" aria-label="Slide {{ index + 1 }}"></button>
            </div>
            <div class="carousel-inner">
              <div v-for="(item, index) in missCareImgList" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }">
                <img :src="item.mcImgUrl" class="d-block w-78" alt="Miss Care Image">
                <div class="container">
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
        <div>
          <div>
          <table>
            <colgroup>
              <col width="70px">
            </colgroup>
            <tr>
              <td class="spanTitle">성별</td>
              <td v-if="!isEditMode">{{ missCare.mcGender}}</td>
              <td v-if="isEditMode">
                <input type="text" v-bind:v-model="mcGneder" v-bind:value="missCare.mcGender"/>
              </td>
            </tr>
            <tr>
              <td class="spanTitle">위치</td>
              <td v-if="!isEditMode">{{ missCare.mcLoc }} {{missCare.mcLoc2}} {{ missCare.mcAddr }}</td>
              <td v-if="isEditMode">
                <select v-bind:v-model="mcLoc" @change="fetchSigunguList" class="selectedLocOption1">
                  <option  v-bind:value="missCare.mcLoc">{{ missCare.mcLoc }}</option>
                  <option  v-bind:value="''">모든지역</option>
                  <option v-for="sido in sidoList" :key="sido.orgCd"  v-bind:value="sido.orgCd" >
                    {{ sido.orgdownNm }}
                  </option>
                </select>
                <select v-bind:v-model="mcLoc2" class="selectedLocOption2">
                  <option v-bind:value="missCare.mcLoc2">{{ missCare.mcLoc2 }}</option>
                  <option v-bind:value="''">전체</option>
                  <option v-for="sigungu in sigunguList" :key="sigungu.orgCd"  v-bind:value="sigungu.orgCd">
                    {{ sigungu.orgdownNm }}
                  </option>
                </select>
                <span>장소</span>
                <input type="text" v-bind:v-model="mcAddr" v-bind:value="missCare.mcAddr"/>
              </td>
            </tr>
            <tr>
              <td class="spanTitle">몸무게</td>
              <td v-if="!isEditMode">{{displayWeight(missCare.mcWeight) }}</td>
              <td v-if="isEditMode">
                <select v-bind:v-model="mcWeight" v-bind:value="missCare.mcWeight">
                  <option value="99">미확인</option> <option value="0">1kg 미만</option> <option value="1">1kg</option>
                  <option value="2">2kg</option> <option value="3">3kg</option> <option value="4">4kg</option>
                  <option value="5">5kg</option> <option value="6">6kg</option> <option value="7">7kg</option>
                  <option value="8">8kg</option> <option value="9">9kg</option> <option value="10">10kg</option>
                  <option value="11">11kg</option> <option value="12">12kg</option>  <option value="13">13kg</option>
                  <option value="14">14kg</option> <option value="15">15kg</option>  <option value="16">16kg</option>
                  <option value="17">17kg</option> <option value="18">18kg</option>  <option value="19">19kg</option>
                  <option value="20">20kg</option> <option value="21">21kg</option>  <option value="22">22kg</option>
                  <option value="23">23kg</option> <option value="24">24kg</option>  <option value="25">25kg</option>
                  <option value="26">20kg</option> <option value="27">27kg</option>  <option value="28">28kg</option>
                  <option value="29">20kg</option> <option value="30">30kg</option>  <option value="31">30kg 이상</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="spanTitle">나이</td>
              <td v-if="!isEditMode">{{displayAge(missCare.mcAge) }}</td>
              <select v-bind:v-model="mcAge" v-bind:value="missCare.mcAge" v-if="isEditMode">
                <option value="99">미확인</option>
                <option value="0">1살 이하</option>
                <option value="1">1살</option>
                <option value="2">2살</option>
                <option value="3">3살</option>
                <option value="4">4살</option>
                <option value="5">5살</option>
                <option value="6">6살</option>
                <option value="7">7살</option>
                <option value="8">8살</option>
                <option value="9">9살</option>
                <option value="10">10살</option>
                <option value="11">10살 이상</option>
              </select>
            </tr>
            <tr>
              <td class="spanTitle">털색</td>
              <td  v-if="!isEditMode">{{ missCare.mcColor }}</td>
              <td v-if="isEditMode">
                <input type="text" v-bind:v-model="mcColor" v-bind:value="missCare.mcColor"/>
              </td>
            </tr>
            <tr>
              <td class="spanTitle">특징</td>
              <td  v-if="!isEditMode">{{ missCare.mcChar }}</td>
              <td v-if="isEditMode">
                <input type="text" v-bind:v-model="mcChar" v-bind:value="missCare.mcChar"/>
              </td>
            </tr>
            <tr>
              <td class="spanTitle">기타</td>
              <td v-if="!isEditMode">{{ missCare.mcEtc }}</td>
              <td v-if="isEditMode">
                <input type="text" v-bind:v-model="mcEtc" v-bind:value="missCare.mcEtc"/>
              </td>
            </tr>
            <tr>
              <td class="spanTitle">작성일</td>
              <td>{{ formattedDate }}</td>
            </tr>
          </table>
        </div>
       </div>
      </div>
        <div class="alter" v-if="isCurrentUserAuthor()">
          <div class="text">
            <button v-if="!isEditMode" @click="toggleEditMode">
              <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
            </button>
            <span>수정</span>
          </div>
        </div>

        <button v-if="isEditMode" @click="saveChanges">저장</button>
        <div class="box">
          <div class="replyBox">
            <input type="text" class="reply" v-model="reply" placeholder="댓글을 작성해주세요">
            <button type="button" class="btn-reply" @click="writeReply">작성</button>
          </div>
          <div class="replyBox-child">
            <div class="reply_" v-for="(reply, index) in replyList" :key="index">
              <div class="reply-info">

                <div class="nickname">{{ reply.userNickname }}<div v-if="reply.userNo == missCare.userNo" class="writer">작성자</div></div>
                <div class="re">{{ reply.reply }}</div>
                <div class="regdate">{{ formattedReplyDate(reply.replyDate) }}</div>
              </div>
              <div class="r-reply-box" >
                <div class="r-reply">
                  <div class="r-open">
                    <button @click="openReplyUpload(index)">답글</button>
                  </div>
                  <div class="r-r-box" v-if="reply.showReReplyBox">
                    <input type="text" class="reply" v-model="reReply" placeholder="댓글을 작성해주세요">
                    <button type="button" class="btn-reply" @click="writeReReply(reply.replyNo)">답글</button>
                  </div>
                </div>
              </div>
              <div v-for="reReply in reReplyList" :key="reReply" class="reReplyBox">
                <div v-if="reReply.replyNo === reply.replyNo" class="reReplyIf">
                  <div class="icon"><i class="fa fa-terminal" aria-hidden="true"></i></div>
                  <div class="reNickname">{{reReply.userNickname}}<div v-if="reReply.userNo == missCare.userNo" class="writer">작성자</div></div>
                  <div class="reReply">{{reReply.reReply}}</div>
                  <div class="reRegdate">{{formattedReplyDate(reReply.reReplyDate)}}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import moment from "moment/moment";
import {onMounted, ref} from "vue";
import store from "@/scrpits/store";
import axios from "axios";
import router from "@/scrpits/router";

export default {
  name : 'MissCareModal',
  setup(){
    const userNo = ref(store.state.user.userNo);
    onMounted(()=>{
      store.watch(()=> store.state.user.userNo,(newValue) =>{
        userNo.value = newValue;
      });
    });
    return { userNo };
  },
  props:['mcNo', 'modalData', 'missCare', 'replyData','reReplyData'],
  components:{

  },
  data(){
    return{
      mcLoc: '',
      mcLoc2: '',
      sidoList: [],
      sigunguList: [],
      missCareImgList: [],
      isEditMode: false, // 수정 모드 플래그
      editedValue: '', // 사용자가 입력한 값을 저장하는 데이터
      originalValue: '',
      misscareReplyDto: {
        replyNo: null,
        replyWriter: this.userNo,
        mcNo: this.$props.mcNo,
        reply: null,
        replyDate: null,
      },
      mcReReplyDto:{
        reReplyNo: null,
        reReplyWriter: this.userNo,
        replyNo: null,
        reReplyDate: null,
        reReply:null,
      },
      replyList:[],
      reReplyList:[],
      reply: "",
      showReReplyBox:false,
      replyNo:"",
      reReply:"",

    }
  },
  mounted() {
    this.fetchSidoList();
    this.fetchSigunguList();
  },
  computed: {
    mcStatusLabel() {
      switch (this.missCare.mcStatus) {
        case 1:
          return "실종";
        case 2:
          return "제보";
        default:
          return "완료";
      }
    },
    formattedDate(){
      return moment(this.missCare.mcRegdate).format('YYYY.MM.DD');
    },

    msStatusClass() {
      switch (this.missCare.mcStatus) {
        case 1:
          return "btn-miss";
        case 2:
          return "btn-care";
        default:
          return "btn-comp";
      }
    },
  },

  watch: {
    modalData: {
      handler: 'updateMissCareImgList',
      immediate: true,
    },
    replyData: {
      handler: 'updateReplyList',
      immediate: true,
    },
    reReplyData:{
      handler: 'updateReReplyList',
      immediate: true,
    }
  },
  methods:{
    editValue() {
      this.originalValue = this.missCare.mcGender;
      this.editedValue = this.missCare.mcGender;
      this.isEditMode = true;
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    openReplyUpload(index) {
      const replyNo = this.replyList[index].replyNo;
      this.replyList.forEach((reply, i) => {
        if (i === index) {
          reply.showReReplyBox = !reply.showReReplyBox;
          this.replyNo = replyNo;
        } else {
          reply.showReReplyBox = false;
        }
      });
    },

    formattedReplyDate(date){
      return moment(date).format('YYYY.MM.DD');
    },
    isCurrentUserAuthor() {
      return this.missCare.userNo === this.userNo;
    },
    closeModal() {
      this.$emit('close');
    },
    updateMissCareImgList() {
      this.missCareImgList = this.modalData;
    },
    updateReplyList() {
      this.replyList = this.replyData;
    },
    updateReReplyList(){
      this.reReplyList = this.reReplyData;
    },
    displayAge(age) {
      if (age === 99) {
        return '미확인';
      } else if (age === 0) {
        return '1살 이하';
      } else if (age >= 11) {
        return '10살 이상';
      } else {
        return age + '살';
      }
    },
    displayWeight(weight){
      if(weight === 99){
        return '미확인';
      }else if(weight === 0){
        return '1kg 이하'
      }else if(weight === 31){
        return '30kg 이상'
      }else{
        return weight + 'kg';
      }
    },
    writeReply(){

      if (this.userNo) {
        this.misscareReplyDto.replyWriter = this.userNo;
        const requestData = {
          reply: this.reply,
          mcNo: this.$props.mcNo,
          userNo: this.userNo,
        };
        axios.post('/animate/misscare/reply', requestData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
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
    writeReReply(replyNo) {
      console.log(replyNo);
      if (this.userNo) {
        this.mcReReplyDto.replyWriter = this.userNo;
        const reReplyData = {
          reReply: this.reReply,
          replyNo: replyNo,  // Ensure replyNo is included in the request data
          userNo: this.userNo,
          mcNo:this.$props.mcNo
        };

        axios.post('/animate/misscare/reply/re', reReplyData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          // this.$router.go(0);
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
    async fetchSidoList() {
      try {
        const response = await fetch('http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?numOfRows=17&pageNo=1&serviceKey=aQc0i7nxPnLiQlZAS7cmLwlDZjOT3fdCdEI7XY2VzJP57%2BS1B6Djo1EeqOtJX0t7C%2B%2F3OQ4G7K5Eklk%2FZooJmw%3D%3D');
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
        const items = xmlDoc.querySelectorAll('item');

        this.sidoList = Array.from(items).map(item => {
          return {
            orgCd: item.querySelector('orgCd')?.textContent || '',
            orgdownNm: item.querySelector('orgdownNm')?.textContent || '',
          };
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchSigunguList(){
      try{
        const selectedSido = this.sidoList.find(sido => sido.orgCd === this.mcLoc);
        if(selectedSido){
          const response = await fetch(`http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu?upr_cd=${selectedSido.orgCd}&serviceKey=aQc0i7nxPnLiQlZAS7cmLwlDZjOT3fdCdEI7XY2VzJP57%2BS1B6Djo1EeqOtJX0t7C%2B%2F3OQ4G7K5Eklk%2FZooJmw%3D%3D`);
          const xmlData = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
          const items = xmlDoc.querySelectorAll('item');

          this.sigunguList = Array.from(items).map(item => {
            return {
              uprCd: item.querySelector('uprCd')?.textContent || '',
              orgCd: item.querySelector('orgCd')?.textContent || '',
              orgdownNm: item.querySelector('orgdownNm')?.textContent || '',
            };
          });
        } else {
          console.error('Selected sido not found');
        }
      }catch(error){
        console.error('Error fetching data:', error);
      }
    },
  }
}
</script>



<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  width: 1000px;
  background: white;
  padding: 20px;
  border-radius: 8px;
}
.closeBtn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  background-color: white;
  margin: 0 0 10px 10px;
}

.closeBtn button {
  background-color: white;
  border: 0;
  margin-left: auto;
  font-size: 23px;
}
.animal-info{
  width: 400px;
  height: 300px;

}
.carousel-item{
  width: 100%;
  height: 300px;
}
.carousel-item img{
  margin:auto;
  width: 80%;
  height: 85%;
}
.carousel-inner{
  width: 100%;
  height: 100%;
}
.carousel-control-next-icon {
   background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2300fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e);
 }
.carousel-control-prev-icon {
  background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2300fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e);
}
.carousel-control-prev, .carousel-control-next{
  width: 10%;
}
.carousel-indicators [data-bs-target]{
  background-color: #5e5e5e;
}
.btn-miss{
  width: 50px;
  height: 25px;
  text-align: center;
  border-radius: 0.5rem;
  border-color: #ff5656;
  background-color: #ff5656;
  color: white;
  font-weight: 600;
  margin-right: 10px;
}

.btn-care{
  width: 50px;
  height: 25px;
  text-align: center;
  border-radius: 0.5rem;
  border-color: #e7c300;
  background-color: #e7c300;
  color: #ffffff;
  font-weight: 600;
  margin-right: 10px;
}

.btn-comp{
  width: 50px;
  height: 25px;
  text-align: center;
  border-radius: 0.5rem;
  border-color: #696969;
  background-color: #696969;
  color: #ffffff;
  font-weight: 600;
  margin-right: 10px;
}

.closeBtn span{
  font-weight: bolder;
}
.content{
  display: flex;

}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px;
}

th, td {
  height: 25px;
  text-align: left;
  padding: 0 10px 0 0;
}

td:first-child {
  text-align: center;
  border-right: 2px solid #c5c4c4;
}

.spanTitle {
  font-weight: bold;
}
.alter{
  display: flex;
  flex-direction: row-reverse;
}

.alter button{
  background-color: white;
  border: 0;
  color: rgba(129, 128, 23, 0.48);
}
.text{
  display: grid;
  justify-items: center;
}

.text span{
  font-size: 12px;
}

.reply{
  width: 89%;
  padding: 5px;
  font-size: 15px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px

}

.replyBox{
}

.btn-reply{
  margin: 0 0 0 2px;
  width: 10%;
  height: 30px;
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

table input{
  border: 1px solid #929294;
}
</style>