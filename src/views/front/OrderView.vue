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
        <h2 class="mt-12 mb-3">訂單成立</h2>
        <p>感謝您訂購我們的商品，收到訂單後，預計1~2天出貨，請您耐心等候</p>
        <div class="w-75 mx-auto mt-25">
            <ul class="progressbar list-unstyled d-flex justify-content-between mb-0">
                <li>購物車</li>
                <li>填寫資料</li>
                <li class="active">完成訂單</li>
            </ul>
            <div class="progress" style="height: 5px;">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="33.3" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
            </div>
        </div>
        <div class="row justify-content-center mt-10 mb-25">
            <div class="col-lg-8 bg-secondary">
                <div class="text-center py-6 px-9">
                    <h2>訂單資訊</h2>
                    <hr class="text-black mt-6">
                    <div class="row justify-content-center">
                        <div class="col-lg-9">
                            <table class="w-100">
                                <template v-if="OrderData.user">
                                    <tbody class="text-start fs-3">
                                        <tr class="">
                                            <td class="pb-5">訂單編號</td>
                                            <td class="pb-5">{{ OrderData.id }}</td>
                                        </tr>
                                        <tr class="">
                                            <td class="pb-5">成立時間</td>
                                            <td class="pb-5">{{ OrderData.create_at }}</td>
                                        </tr>
                                        <tr class="">
                                            <td class="pb-5">姓名</td>
                                            <td class="pb-5">{{ OrderData.user.name }}</td>
                                        </tr>
                                        <tr class="">
                                            <td class="pb-5">電話</td>
                                            <td class="pb-5">{{ OrderData.user.tel }}</td>
                                        </tr>
                                        <tr class="">
                                            <td class="pb-5">信箱</td>
                                            <td class="pb-5">{{ OrderData.user.email }}</td>
                                        </tr>
                                        <tr class="">
                                            <td class="pb-5">地址</td>
                                            <td class="pb-5">{{ OrderData.user.address }}</td>
                                        </tr>
                                        <tr>
                                            <td class="pb-5">留言</td>
                                            <td class="pb-5">{{ OrderData.message }}</td>
                                        </tr>
                                        <tr>
                                            <td class="pb-5">訂單金額</td>
                                            <td class="pb-5">{{ orderPrice }}</td>
                                        </tr>
                                        <tr class="">
                                            <td class="pb-5">付款狀態</td>
                                            <td class="pb-5">
                                                <span v-if="is_paid" class="text-success">完成付款</span>
                                                <span v-else class="text-danger">尚未付款</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </table>
                            <button
                                type="button" class="btn btn-primary btn-lg py-4 px-12 mt-5 mb-10"
                                @click="changeStatus"
                                v-if="!is_paid"
                            >
                                確認付款
                            </button>
                            <div v-else class="py-8">
                              <router-link to="/" class="fs-5">返回首頁</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import Swal from 'sweetalert2'
import cartStore from '../../stores/cart'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      OrderData: {},
      is_paid: false,
      isLoading: true
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/order/${this.$route.params.id}`)
        .then(res => {
          this.OrderData = res.data.order
          this.isLoading = false
        })
    },
    changeStatus () {
      this.isLoading = true
      this.$http.post(`${VITE_URL}api/${VITE_PATH}/pay/${this.$route.params.id}`)
        .then(res => {
          this.is_paid = true
          this.isLoading = false
          Swal.fire({
            icon: 'success',
            title: '付款成功',
            showConfirmButton: false,
            timer: 1000
          })
        })
        .catch(() => {
          Swal.fire({
            icon: 'success',
            title: '付款失敗',
            showConfirmButton: false,
            timer: 1000
          })
        })
    }
  },
  computed: {
    ...mapState(cartStore, ['orderPrice'])
  },
  mounted () {
    this.getOrder()
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
