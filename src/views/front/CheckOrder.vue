<template>
    <div>
      <AppLoading v-model:active="isLoading">
          <div id="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
          </div>
      </AppLoading>
    </div>
    <div class="container">
        <div class="my-5">
            <a href="#/cart" class="d-flex align-items-center">
                <span class="material-symbols-outlined">
                    chevron_left
                </span>
                <span class="fs-4">返回購物車清單</span>
            </a>
        </div>
        <h2 class="mb-12">顧客資訊</h2>
        <div class="w-75 mx-auto mt-30">
            <ul class="progressbar list-unstyled d-flex justify-content-between mb-0">
                <li>購物車</li>
                <li class="active">填寫資料</li>
                <li>完成訂單</li>
            </ul>
            <div class="progress" style="height: 5px;">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="33.3" aria-valuemin="0" aria-valuemax="100" style="width: 50%"></div>
            </div>
        </div>
        <div class="my-20 row justify-content-center">
            <v-form
                ref="form"
                class="col-md-6"
                v-slot="{ errors }"
                @submit="order"
            >
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <Field
                        id="email"
                        name="Email"
                        type="email"
                        class="form-control"
                        placeholder="請輸入 Email"
                        rules="email|required"
                        v-model="data.user.email"
                        :class="{ 'is-invalid': errors['Email'] }"
                    >
                    </Field>
                    <error-message name="Email" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">收件人姓名</label>
                    <Field
                        id="name"
                        name="姓名"
                        type="text"
                        class="form-control"
                        placeholder="請輸入姓名"
                        rules="required|min:2"
                        v-model="data.user.name"
                        :class="{ 'is-invalid': errors['姓名'] }"
                    >
                    </Field>
                    <error-message name="姓名" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">收件人電話</label>
                    <Field
                        id="tel"
                        name="電話"
                        type="text"
                        class="form-control"
                        placeholder="請輸入電話"
                        rules="required|numeric|min:8"
                        v-model="data.user.tel"
                        :class="{ 'is-invalid': errors['電話'] }"
                    >
                    </Field>
                    <error-message name="電話" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">收件人地址</label>
                    <Field
                        id="address"
                        name="地址"
                        type="text"
                        class="form-control"
                        placeholder="請輸入地址"
                        rules="required"
                        v-model="data.user.address"
                        :class="{ 'is-invalid': errors['地址'] }"
                    >
                    </Field>
                    <error-message name="地址" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-5">
                    <label for="message" class="form-label">留言</label>
                    <textarea
                        id="message"
                        class="form-control"
                        cols="30"
                        rows="10"
                        style="resize:none; height: 200px; overflow-y: auto;"
                        v-model="data.message"
                    >
                    </textarea>
                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-lg btn-primary w-100">送出訂單</button>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import VeeValidateRules from '@vee-validate/rules'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
Object.keys(VeeValidateRules).forEach((rule) => {
  defineRule(rule, VeeValidateRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true
})
setLocale('zh_TW')
export default {
  data () {
    return {
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      orderId: '',
      isLoading: false
    }
  },
  components: {
    Field,
    VForm: Form,
    ErrorMessage
  },
  methods: {
    order () {
    //   this.$router.push('/order')
      const orderList = this.data
      this.isLoading = true
      this.$http.post(`${VITE_URL}api/${VITE_PATH}/order`, { data: orderList })
        .then(res => {
          this.orderId = res.data.orderId
          this.data = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: ''
            },
            message: ''
          }
          this.$router.push(`/order/${this.orderId}`)
          this.isLoading = false
          Swal.fire({
            icon: 'success',
            title: '訂單建立成功',
            showConfirmButton: false,
            timer: 1000
          })
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '訂單建立失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#load {
  position:absolute;
  width:600px;
  height:36px;
  left:50%;
  top:40%;
  margin-left:-300px;
  overflow:visible;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  cursor:default;
}
#load div {
  position:absolute;
  width:20px;
  height:36px;
  opacity:0;
  font-family:Helvetica, Arial, sans-serif;
  animation:move 3s linear infinite;
  -o-animation:move 3s linear infinite;
  -moz-animation:move 3s linear infinite;
  -webkit-animation:move 3s linear infinite;
  transform:rotate(180deg);
  -o-transform:rotate(180deg);
  -moz-transform:rotate(180deg);
  -webkit-transform:rotate(180deg);
  color: black;
}
#load div:nth-child(2) {
  animation-delay:0.2s;
  -o-animation-delay:0.2s;
  -moz-animation-delay:0.2s;
  -webkit-animation-delay:0.2s;
}
#load div:nth-child(3) {
  animation-delay:0.4s;
  -o-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
}
#load div:nth-child(4) {
  animation-delay:0.6s;
  -o-animation-delay:0.6s;
  -moz-animation-delay:0.6s;
  -webkit-animation-delay:0.6s;
}
#load div:nth-child(5) {
  animation-delay:0.8s;
  -o-animation-delay:0.8s;
  -moz-animation-delay:0.8s;
  -webkit-animation-delay:0.8s;
}
#load div:nth-child(6) {
  animation-delay:1s;
  -o-animation-delay:1s;
  -moz-animation-delay:1s;
  -webkit-animation-delay:1s;
}
#load div:nth-child(7) {
  animation-delay:1.2s;
  -o-animation-delay:1.2s;
  -moz-animation-delay:1.2s;
  -webkit-animation-delay:1.2s;
}
@keyframes move {
  0% {
    left:0;
    opacity:0;
  }
  10% {left: 41%;
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  40% {
    left:59%;
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    left:100%;
    -moz-transform:rotate(-180deg);
    -webkit-transform:rotate(-180deg);
    -o-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}
@-moz-keyframes move {
  0% {
    left:0;
    opacity:0;
  }
  10% {
    left:41%;
    -moz-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  40% {
    left:59%;
    -moz-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    left:100%;
    -moz-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}
@-webkit-keyframes move {
  0% {
    left:0;
    opacity:0;
  }
  10% {
    left:41%;
    -webkit-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  40% {
    left:59%;
    -webkit-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    left:100%;
    -webkit-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}
</style>
