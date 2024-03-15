<template>
  <div class="container">
    <div class="content">
      <div class="py-5 text-center">
      </div>
      <div class="g-5">
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">회원가입</h4>
          <div class="needs-validation">
            <div class="row g-3">
              <div class="col-12">
                <div class="input-group has-validation">
                  <span class="input-group-text"><i class="fa fa-user" aria-hidden="true"></i></span>
                 <input type="text" class="form-control" v-model="userId" placeholder="아이디" required :class="{ 'is-invalid': !userIdRules[0](userId) }">
                  <div class="input-group-text">
                    <button @click="checkDuplicateId" class="dup">중복 검사</button>
                    <i v-if="userIdExist  == false" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                  </div>
                </div>
                <div class="input-group-texts">
                  <div>
                    <i v-if="userId && userIdRules[0](userId) == true" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                    <span>아이디를 입력해주세요</span>
                  </div>

                </div>
              </div>
              <div class="col-12">
                <div class="input-group has-validation">
                  <span class="input-group-text"><i class="fa fa-lock" aria-hidden="true"></i></span>
                  <input type="password" class="form-control" v-model="userPassword" placeholder="비밀번호" required :rules="userPasswordRules">
                </div>
                  <div class="input-group-texts">
                    <div>
                      <i v-if="userPassword && userPasswordRules[0](userPassword) == true" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                      <span>비밀번호를 입력해주세요</span>
                    </div>
                    <div>
                    <i v-if="userPassword && userPasswordRules[1](userPassword) == true" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                    <span> 비밀번호는 5~12글자의 숫자 및 특수문자를 포함해야합니다.</span>
                    </div>
                  </div>

              </div>

              <div class="col-12">
                <div class="input-group has-validation">
                  <span class="input-group-text"><i class="fa fa-lock" aria-hidden="true"></i></span>
                  <input type="password" class="form-control" v-model="userPasswordCheck" placeholder="비밀번호 확인" :rules="passwordCheckRules.concat(passwordConfirmationRule)" required>
                </div>
                  <div class="input-group-texts" v-if="userPasswordCheck.length > 0">
                    <div v-if="userPasswordCheck && userPassword === userPasswordCheck">
                      <i class="fa fa-check-circle text-success" aria-hidden="true"></i>
                      <span>비밀번호가 일치합니다.</span>
                    </div>
                    <div v-else >
                      <i class="fa fa-times-circle text-danger" aria-hidden="true"></i>
                      <span>비밀번호가 일치하지 않습니다.</span>
                    </div>
                  </div>

              </div>


              <div class="col-12">
                <div class="input-group has-validation">
                  <span class="input-group-text"><i class="fa fa-id-card" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" v-model="userName" placeholder="이름" required :rules="userNameRules">
                </div>
                  <div class="input-group-texts">
                    <div>
                      <i v-if="userName && userNameRules[0](userName)  == true" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                      <span>이름을 입력해주세요</span>
                    </div>
                  </div>

              </div>

              <div class="col-12">
                <div class="input-group has-validation">
                  <span class="input-group-text"><i class="fa fa-user-plus" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" v-model="userNickname" placeholder="닉네임" required :rules="nicknameRules">
                  <div class="input-group-text">
                    <button @click="checkDuplicateNickname"  class="dup">중복 검사</button>
                    <i v-if="userNicknameExist  == false" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                  </div>
                </div>
                  <div class="input-group-texts">
                    <div>
                      <i v-if="userNickname && nicknameRules[0](userNickname) == true" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                      <span>닉네임을 입력해주세요.</span>
                    </div>
                    <div>
                      <i v-if="userNickname && nicknameRules[1](userNickname) == true" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                      <span> 닉네임은 10글자 이내로 작성해주세요</span>
                    </div>
                  </div>

              </div>
              <div class="col-12">
                <div class="input-group has-validation">
                  <span class="input-group-text"><i class="fa fa-phone" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" v-model="userPhone" placeholder="01012345678" required :rules="userPhoneRules">
                </div>
                <div class="input-group-texts">
                  <div>
                    <i v-if="userPhone && userPhoneRules[0](userPhone) == true" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                    <span>전화번호는 숫자 11자리로 입력해주세요.</span>
                  </div>

                </div>
              </div>

              <div class="col-12">
                <div class="input-group has-validation">
                  <span class="input-group-text"><i class="fa  fa-envelope-o" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" v-model="userEmail" placeholder="[선택] example@google.com" :rules="emailRules">
                </div>
                  <div v-if="userEmail.length > 0" class="input-group-texts">
                    <i v-if="userEmail && emailRules[0](userEmail) == true" class="fa fa-check-circle text-success" aria-hidden="true"></i>
                    <span>이메일 형식으로 작성해주세요.</span>
                  </div>

              </div>
            </div>
            <button class="w-100 btn btn-primary btn-lg"  @click.prevent="signUpSubmit">회원가입</button>
          </div>
        </div>
      </div>

  </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "RegisterStep2",
  data() {

    return {
      userIdExist: true,
      userNicknameExist:true,
      userDto: {
        userId: null,
        userPassword: null,
        userName: null,
        userNickname: null,
        userPhone: null,
        userEmail: null,

      },
      userId: "",
      userIdRules: [
        (v) => {
          const isValid = (v !== undefined && v !== null && v.trim() !== '');
          return isValid || '아이디를 작성해주세요';
        },
      ],
      userPassword: "",
      userPasswordRules: [
        (v) => !!v ||  '비밀번호를 작성해주세요',
        (v) => (v && v.length >= 5 && v.length<=12) &&  /(?=.*\d)/.test(v) && /([!@$%*#^&?])/.test(v) ||  ' (5~12글자, 숫자 및 특수문자를 포함해야합니다.)',
      ],
      userPasswordCheck: "",
      passwordCheckRules: [
        (v) => !!v || '비밀번호를 확인을 작성해주세요',
      ],
      userName: "",
      userNameRules: [
        (v) => !!v || '이름을 작성해주세요',
      ],

      userNickname: "",
      nicknameRules: [
        (v) => !!v || '닉네임을 작성해주세요',
        (v) => (v && v.length <= 10) || '닉네임은 10글자를 넘을 수 없습니다.',
      ],
      userPhone: "",
      userPhoneRules: [
        (v) => !!v &&  (v && /^\d{11}$/.test(v) )|| '전화번호를 숫자 11자리로 작성해주세요',
      ],
      userEmail: "",
      emailRules: [
        (v) => v.length > 0 && /.+@.+\..+/.test(v) || "이메일 형식으로 작성해주세요",
      ],


    }

  },
  computed: {
    passwordConfirmationRule() {
      return () =>
          this.userPassword !== this.userPasswordCheck || "패스워드가 일치하지 않습니다";
    }
  },
  mounted() {
    console.log('Mounted!');
  },
  methods: {
    signUpSubmit() {
      if (
          !this.userId ||
          !this.userPassword ||
          !this.userPasswordCheck ||
          !this.userName ||
          !this.userNickname ||
          !this.userPhone
      ) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
      }

      const regData = {
        userId:this.userId,
        userPassword:this.userPassword,
        userName: this.userName,
        userNickname: this.userNickname,
        userPhone: this.userPhone,
        userEmail: this.userEmail,
      };
      try {
        axios.post("/animate/user/register", regData, {
          headers: {
            "Content-Type": `application/json`,
          },
        })
            .then((response) => {
              console.log(response)
              if (response.data.errorCode === 400) {
                alert(response.data.errorMessage)

              } else {
                alert("회원가입이 완료되었습니다. 로그인 화면으로 돌아갑니다")
                this.$router.push({path: '/login'});
              }
            })
            .catch(error => {
              console.log(error.response);

            });
      } catch (error) {
        console.error(error);
      }
    },
    checkDuplicateId() {
      axios.post("/animate/user/duplicateUserId", { userId: this.userId })
          .then(response => {
            if (response.data === "true") {
              alert("이미 사용 중인 아이디입니다.");
              this.userIdExist = true;
            } else {
              alert("사용 가능한 아이디입니다.");
              this.userIdExist = false;
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    checkDuplicateNickname() {
      axios.post("/animate/user/duplicateUserNickname", { userNickname: this.userNickname })
          .then(response => {
            if (response.data === "true") {
              alert("이미 사용 중인 닉네임입니다.");
              this.userNicknameExist = true;
            } else {
              alert("사용 가능한 닉네임입니다.");
              this.userNicknameExist = false;
            }
          })
          .catch(error => {
            console.log(error);
          });
    },


  }
};
</script>

<style scoped>
.dup{
  border: 0;
  background-color: #99000000;
}
.content{
  width: 768px;
  margin:auto;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
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
.col-md-7.col-lg-8{
  margin: auto;
}
.fa {
  width:15px;
  height: 15px;
}
.row.g-3{
  margin-bottom: 50px
}
.invalid-feedbacks{
  width: 100%;
  margin-top: 0.25rem;
  font-size: .875em;
  color: var(--bs-form-invalid-color);

}
.input-group-texts{
  font-size: 13px;
  padding: 5px 0 0 5px;
}
</style>