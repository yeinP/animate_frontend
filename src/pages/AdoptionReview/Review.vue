<template>
  <div class="container">
    <div style="display: flex;     flex-direction: row-reverse; margin-bottom: 10px;">
      <button @click="openWriteToggle" class="ar-Btn"><i class="fa fa-paw" aria-hidden="true"></i>입양후기 작성</button>
    </div>
    <div v-if="showModal" class="modal modal-sheet position-static d-block p-4 py-md-5" tabindex="-1" role="dialog" id="modalSheet">
      <div class="card shadow-sm">
        <div class="card-body1">
          <div>
            <input type="text" placeholder="제 목" v-model="arTitle" class="arTitle">
          </div>
        </div>
        <div class="modal-body py-0" style="position: relative;">
          <div class="imgSelectBox">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
              <div class="imgSelect">
              <label for="fileInput" class="custom-file-upload">
                <i class="fa fa-file-image-o" aria-hidden="true"></i><span>파일 선택</span>
              </label>
              <span style="margin-left: 2px; font-size: 15px">( 최대 5개까지 선택 가능합니다. )</span>
              <input id="fileInput" ref="fileInput" type="file" @change="handleFileChange" style="display: none;" multiple/>
              </div>
              <div class="selected-images-container" style="position: absolute">
                <div v-for="(file, index) in selectedFiles" :key="index" class="selected-image">
                  <button @click="removeImage(index)" class="remove-image-button">X</button>
                  <img :src="file.preview" alt="Selected Image" style="max-width: 200px; max-height:150px; margin-right: 10px;" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div>
            <textarea type="text" style="width: 100%; height: 150px;" placeholder="내용을 작성해 주세요" v-model="arContent" class="arContent"></textarea>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary" @click="uploadReview">작성</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
      <div class="col" v-for="adoptionReview in paginationArList" :key="adoptionReview.arNo">
        <ReviewCard :adoptionReview="adoptionReview" :arImgList="arImgList" :adoptionUserNickname="adoptionReview ? adoptionReview.userNickname : null" />
      </div>
    </div>
    <div class="pagination d-flex justify-content-center" >
      <button @click="prevPage" :disabled="currentPage === 1"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
      <span v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: page === currentPage }" style="margin: 0 5px 0 5px; cursor: pointer">{{ page }}</span>
      <button @click="nextPage" :disabled="currentPage * itemsPerPage >= paginationArList.length"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
    </div>
  </div>
</template>

<script>
import router from "@/scrpits/router";
import {onMounted, ref} from "vue";
import store from "@/scrpits/store";
import ReviewCard from "@/components/review/ReviewCard.vue";
import axios from "axios";

export default {
  name:"Review",
  components: {ReviewCard},
  data(){
    return {
      likeCount: 0,
      showModal: false,
      arTitle:"",
      selectedFiles: [],
      arContent:"",
      arList:[],
      currentPage: 1,
      itemsPerPage: 9,
      totalPages:0,
      arImgList:[],
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
  mounted() {
    this.getImgList();
    this.getArList();
  },
  computed:{
    paginationArList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.arList.slice(start, end);
    },
  },
  methods:{
    getImgList(){
      axios.get('http://localhost:9090/adoption/review/imgList')
          .then((response) => {
            this.arImgList = response.data;
          }).catch((error)=>{
        console.error("Img데이터 오류" , error);
      })
    },
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.arList.length) {
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
    getArList() {
      axios.get('http://localhost:9090/adoption/review/list')
          .then((response) => {
            this.arList = response.data;
            console.log(response.data);
            this.totalPages = Math.ceil(this.arList.length / this.itemsPerPage);
            if (this.currentPage > this.totalPages) {
              this.currentPage = this.totalPages;
            }
          }).catch((error)=>{
            console.error("Ar데이터 오류" , error);
      })


    },
    uploadReview(){
      const uploadconfirm = confirm("작성하시겠습니까?");
      if(uploadconfirm == true){
        const formData = new FormData();
        const files = this.$refs.fileInput.files;
        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        }
        formData.append('arTitle', this.arTitle);
        formData.append('arContent', this.arContent);

        axios.post('animate/upload/adoption/review', formData).then(response => {
          window.alert("작성완료되었습니다.")
          this.$router.push({ path: '/review'}).then(()=>{
            window.location.reload();
          })
          console.log(response);
        })
            .catch(error =>{
              console.log(error);
            })
      }else {
        return false;
      }
    },
    openWriteToggle(){
      if (!this.userNo) {
        alert("로그인 후 작성 가능합니다.")
        router.push({path: '/login'})
      } else{
        this.showModal = !this.showModal;
      }
    },
    handleFileChange(event) {
      const filesArray = Array.from(event.target.files);
      if (filesArray.length > 5) {
        alert('사진 선택은 최대 5장까지 가능합니다.');
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
  }
}

</script>
<style scoped>
.arContent[data-v-daf79208] {
  width: 100%;
  height: 225px;
  font-size: 18px;
  padding: 0;
  margin: 0;
  border: white;
  cursor: pointer;
  text-align: left;
  position: relative;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.arContent[data-v-daf79208]::placeholder {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
  padding: 0 1rem;
  margin: 0;
  color: #555;
  cursor: text;
}


.selected-image{
  display: grid;
  justify-items: end;
  align-content: stretch;
}
.selected-image button{
  background-color: rgb(228 228 228);
  border: 0;
  height: 30px;
  width: 30px;
}
.selected-images-container {
  margin: 0 0 0 3%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.custom-file-upload i, .custom-file-upload span{
  margin: 0 0.5rem 0 0 ;
  cursor: pointer;
}
.imgSelect{

  width: 100%;
  margin: 1% 0 0 3%;
}
.imgSelectBox{
  width: 100%;
  height:225px;
  background-color: rgba(214, 214, 214, 0.65);
  border-radius: 1rem;
}
.arTitle{
  width: 100%;
  font-size: 18px;
  padding: 0 0 0 1rem;
  border: white;
  cursor: pointer;
}
.card-body1{
  padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
  color: var(--bs-card-color);
  justify-content: space-between;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
}
.ar-Btn{
  width: 180px;
  height: 35px;
  background-color: rgba(205, 205, 103, 1);
  border: 0;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
}
.pagination button{
  background-color: white;
  border: 0;
}
</style>