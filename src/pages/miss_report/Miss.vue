<template>
<div class="container">
  <div class="album py-5">
    <div class="writeMissBtn">
      <div class="uploadBtn">
      <button @click="toggleModal" class="miss-btn"> <i class="fa fa-bullhorn" aria-hidden="true"></i>실종/목격 신고</button>
      </div>
      <div v-if="showModal" class="modal modal-sheet position-static d-block p-4 py-md-5" tabindex="-1" role="dialog" id="modalSheet">
        <div class="modal-dialog" role="document">
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header border-bottom-0">
              <div class="title">
              <h1 class="modal-title fs-5">실종/목격 신고</h1>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  @click="closeModal"></button>
            </div>
            <div>
              <div class="line">
                <span>기본 정보</span>
              </div>
              <div class="selectedOption">
                <span class="req" style="margin-right: 0;">*</span><span>상태</span>
                <select v-model="mcStatus" class="selectedStatusOption">
                  <option value="1">실종</option>
                  <option value="2">제보</option>
                  <option value="3">완료</option>
                </select>
                <span style="color: orangered"> * 상황이 종료된 후에는 완료로 수정해주세요.</span>
              </div>
              <div class="mcLoc">
                <span class="req" style="margin-right: 0;">*</span><span>지역</span>
                <select v-model="mcLoc" @change="fetchSigunguList" class="selectedLocOption1">
                  <option value="">모든지역</option>
                  <option v-for="sido in sidoList" :key="sido.orgCd" :value="sido.orgCd">
                    {{ sido.orgdownNm }}
                  </option>
                </select>
                <select v-model="mcLoc2" class="selectedLocOption2">
                  <option value="">전체</option>
                  <option v-for="sigungu in sigunguList" :key="sigungu.orgCd" :value="sigungu.orgCd">
                    {{ sigungu.orgdownNm }}
                  </option>
                </select>
              </div>
              <div class="mcAddr">
                <span style="margin-left: 8px;">장소</span>
                <input type="text" v-model="mcAddr" placeholder="구체적인 장소를 적어주세요">
              </div>
              <div class="line">
                <span>동물 정보</span>
              </div>
              <div class="breed">
                <span>품종</span>
                <input type="radio" v-model="mcBreed" value="모든 동물" name="Breed"> <span>모든 동물</span>
                <input type="radio" v-model="mcBreed" value="고양이" name="Breed"> <span>고양이</span>
                <input type="radio" v-model="mcBreed" value="강아지" name="Breed"> <span>강아지</span>
              </div>

              <div class="gender">
                <span>성별</span>
                <input type="radio" v-model="mcGender" value="미확인" name="gender"> <span>미확인</span>
                <input type="radio" v-model="mcGender" value="수컷" name="gender"> <span>수컷</span>
                <input type="radio" v-model="mcGender" value="암컷" name="gender"> <span>암컷</span>
              </div>
              <div class="ageWeight">
                <div class="age">
                  <span>나이</span>
                  <select v-model="mcAge">
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
                </div>

                <div class="weight">
                  <span>몸무게</span>
                  <select v-model="mcWeight">
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
                </div>
              </div>
              <div class="color">
                <span>털색</span>
                <input type="text" placeholder="털색을 설명해주세요" v-model="mcColor">
              </div>
              <div class="char">
                <span>특징</span>
                <input type="text" placeholder="특징을 작성해주세요" v-model="mcChar">
              </div>
              <div class="etc">
                <span>기타</span>
                <input type="text" placeholder="기타사항을 입력해주세요" v-model="mcEtc">
              </div>
            </div>
            <div class="modal-body py-0" >
              <div>
                <label for="fileInput" class="custom-file-upload">
                  <i class="fa fa-cloud-upload"></i> <span>파일 선택</span>
                </label>
                <span style="margin-left: 0.5rem; font-size: 15px">(사진은 1개 이상 최대 3개까지 선택해주세요.)</span>
                <input id="fileInput" ref="fileInput" type="file" @change="handleFileChange" style="display: none;"  multiple/>
              </div>
              <div  class="selected-images-container">
                <div v-for="(file, index) in selectedFiles" :key="index" class="selected-image">
                  <img :src="file.preview" alt="Selected Image" style="max-width: 100px; max-height: 100px; margin-right: 10px;" />
                  <button @click="removeImage(index)" class="remove-image-button">X</button>
                </div>
              </div>
            </div>
            <div class="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
              <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-lg btn-primary" @click="upload">작성</button>
              <button type="button" class="btn btn-lg btn-secondary" @click="closeModal">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div class="col" v-for="missCare in paginatedMissCareList" :key="missCare.mcNo">

        <MissCard :missCare="missCare"/>
      </div>
    </div>
    <div class="pagination d-flex justify-content-center" >
      <button @click="prevPage" :disabled="currentPage === 1"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
      <span v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: page === currentPage }" style="margin: 0 5px 0 5px; cursor: pointer">{{ page }}</span>
      <button @click="nextPage" :disabled="currentPage * itemsPerPage >= missCareList.length"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
    </div>
  </div>

</div>

</template>
<script>


import MissCard from "@/components/missCare/MissCard.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import store from "@/scrpits/store";
import router from "@/scrpits/router";



export default {
  name:"Miss",
  components: {MissCard},
  setup(){
    const userNo = ref(store.state.user.userNo);
    onMounted(()=>{
      store.watch(()=> store.state.user.userNo,(newValue) =>{
        userNo.value = newValue;
      });
    });
    return { userNo };
  },
  data() {
    return {
      missCareList:[],
      currentPage: 1,
      itemsPerPage: 9,
      totalPages:0,
      showModal: false,
      selectedFiles: [],
      selectedOption: '1',
      mcLoc: 'allLoc',
      mcLoc2: '전체',
      mcGender:"미확인",
      mcBreed:"모든 동물",
      mcAge:"99",
      mcWeight:"99",
      mcAddr:"",
      mcStatus:"0",
      mcColor:"",
      mcChar:"",
      mcEtc:"",
      sidoList: [],
      sigunguList: [],
      allLoc:['전체'],

   };
  },
  mounted() {
    this.getMissCareDtoList();
    this.fetchSidoList();
    this.fetchSigunguList();
  },
  computed:{
    paginatedMissCareList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.missCareList.slice(start, end);
    },
  },
  methods:{
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.missCareList.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    getMissCareDtoList(){
      axios.get('http://localhost:9090/animal/miss_care')
          .then((response) => {
            this.missCareList = response.data;
            this.totalPages = Math.ceil(this.missCareList.length / this.itemsPerPage);

            if (this.currentPage > this.totalPages) {
              this.currentPage = this.totalPages;
            }
          })
          .catch((error) => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
          });
    },
    upload(){
      const uploadconfirm = confirm("작성하시겠습니까?")
      if(uploadconfirm == true){
        const formData = new FormData();
        const files = this.$refs.fileInput.files;

        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        } else {
          alert("사진을 1장 이상 추가해주세요.");
          return ;
        }
        const selectedLocText1 = this.sidoList.find(sido => sido.orgCd === this.mcLoc)?.orgdownNm || '';
        const selectedLocText2 = this.sigunguList.find(sigungu => sigungu.orgCd === this.mcLoc2)?.orgdownNm || '';

        formData.append('mcLoc', selectedLocText1);
        formData.append('mcLoc2', selectedLocText2);
        formData.append('mcStatus', this.mcStatus);
        formData.append('mcBreed', this.mcBreed);
        formData.append('mcGender', this.mcGender);
        formData.append('mcAge', this.mcAge);
        formData.append('mcWeight', this.mcWeight);
        formData.append('mcColor', this.mcColor);
        formData.append('mcChar', this.mcChar);
        formData.append('mcEtc', this.mcEtc);
        formData.append('mcAddr', this.mcAddr);


        axios.post('/animate/upload/mcAnimal', formData)
            .then(response => {
              window.alert("작성완료되었습니다.")
              this.$router.push({ path: '/animal/miss_care'}).then(() => {
                window.location.reload();
              })
              console.log(response);
            })
            .catch(error => {
              // Handle the error if needed
              console.error(error);
            });

      } else{
        return false;
      }

    },
    toggleModal() {
      if (!this.userNo) {
        alert("로그인 후 작성 가능합니다.")
        router.push({path: '/login'})
      } else{
      this.showModal = !this.showModal;
      }
    },
    closeModal() {
      const check = confirm("작성을 취소하시겠습니까?");
      if(check){
        this.showModal = false;
      }else {
        this.showModal = true;
      }

    },
    handleFileChange(event) {
      const filesArray = Array.from(event.target.files);
      if (filesArray.length > 3) {
        alert('사진 선택은 최대 3장까지 가능합니다.');
        return;
      }
      this.selectedFiles = filesArray;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedFiles[i] = {
            file: this.selectedFiles[i],
            preview: e.target.result,
          };
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    },
    removeImage(index) {
      const updatedSelectedFiles = [...this.selectedFiles];

      updatedSelectedFiles.splice(index, 1);

      this.selectedFiles = updatedSelectedFiles;
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

  },



}

</script>
<style scoped>
.selected-images-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.selected-image {
  margin-right: 10px;
}

.modal-content{
  height: 100%;
}

.modal-dialog{
  max-width:600px;
}
.modal-body{
  display: grid;
}
.remove-image-button {
  position: initial;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
}
.modal-footer{
  display: flow;
}
.btn-lg{
  margin:3px;
}

.selectedOption, .mcAddr, .mcLoc{
  padding: 0.5rem 1rem;
}

.mcLoc option{
  width: 125px;
  text-align: center;
}
.selectedOption span, .selectedOption select, .mcAddr span, .mcLoc span{
  margin-right: 1rem;
}
.mcAddr input{
  width: 250px;
}
.line{
  border-radius: inherit;
  text-align: center;
  color: #6b6b6b;
  background-color: #dedd657a;
  height: 30px;
}

.line span{
  margin: auto;
  font-size: 18px;
  font-weight: bolder;
}
.selectedLocOption2 {
  width: 125px;
}
.selectedLocOption1 {
  margin-right: 10px;
}
.selectedStatusOption{
  text-align: center;
  width: 125px;
}
.gender, .age, .weight, .breed, .color, .etc, .char{
  padding: 0.5rem 1.4rem;
}
.gender span, .age span, .weight span, .breed span, .color span, .etc span, .char span{
  margin-right:1rem;
}
.ageWeight{
  display: flex;
  align-items: center;
}

.color input, .etc input {
  width: 400px;
}
.custom-file-upload {
  margin-top:2px;

  display: inline-block;
  cursor: pointer;
}
.req{
  color: red;
  margin-right: 0;
}

.custom-file-upload{
  margin-left: 0.5rem;

}


.miss-btn i{
  margin-right: 0.5rem;
}
.uploadBtn{
  display: flex;
  flex-direction: row-reverse;
  margin: 0 0 0.5rem;
}

.miss-btn{
  width: 180px;
  height: 35px;
  background-color: rgba(205, 205, 103, 1);
  border: 0;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
}

.pagination{
  margin-top: 1rem;
}

.pagination button{
 background-color: white;
  border: white;
}

</style>
