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
        <h2 class="my-12">購物車清單</h2>
        <div class="w-75 mx-auto mt-30">
            <ul class="progressbar list-unstyled d-flex justify-content-between mb-0">
                <li class="active">購物車</li>
                <li>填寫資料</li>
                <li>完成訂單</li>
            </ul>
            <div class="progress" style="height: 5px;">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="33.3" aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
            </div>
        </div>
        <div class="border border-secondary mt-15 mb-30">
            <div class="w-100 bg-secondary p-4">
                <p class="mb-0">購物車</p>
            </div>
            <div class="p-4 pb-30">
                <table class="table align-middle mb-0">
                    <thead>
                        <tr>
                            <th width="50px"></th>
                            <th scope="col" class="text-center">品名</th>
                            <th scope="col" width="100px">單價</th>
                            <th scope="col" width="220px"  class="text-center">數量</th>
                            <th class="text-end" width="150px">小計</th>
                        </tr>
                    </thead>
                    <tbody class="">
                      <template v-if="cartList.length !== 0">
                        <tr v-for="cartProduct in cartList" :key="cartProduct.id">
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-outline-danger btn-sm"
                                    @click="() => deleteSingle(cartProduct)"
                                    :disabled="loadingItem === cartProduct.id"
                                >
                                X
                                </button>
                            </td>
                            <td class="text-center">
                              {{ cartProduct.product.title }}
                            </td>
                            <td class="fs-5">
                              {{ cartProduct.product.price }}
                            </td>
                            <td class="d-flex justify-content-center">
                              <div class="input-group w-50" >
                                <input
                                  v-model="cartProduct.qty"
                                  type="number"
                                  min="1"
                                  class="form-control border-secondary"
                                  @change="() => editNum(cartProduct)"
                                  :disabled="loadingItem === cartProduct.id"
                                >
                                <span class="input-group-text bg-secondary border-secondary">
                                  {{ cartProduct.product.unit }}
                                </span>
                              </div>
                            </td>
                            <td class="text-end fs-5">
                                ${{ cartProduct.total.toLocaleString() }}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="fs-5 text-end fw-bold">
                                總計：
                                ${{ total.toLocaleString() }}
                            </td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                            <td>
                            </td>
                            <td class="text-secondary text-end">
                                <h3 class="mt-3">購物車目前沒東西~</h3>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                      </template>
                    </tbody>
                </table>
                <div class="text-end mt-10">
                    <button @click="returnRouter" type="button" class="btn btn-primary btn-lg">確認訂單</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      cartList: {},
      isLoading: true,
      loadingItem: '',
      total: 0,
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/cart`)
        .then(res => {
          this.cartList = res.data.data.carts
          this.total = res.data.data.total
          this.isLoading = false
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '取得購物車資料失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    deleteSingle (product) {
      this.loadingItem = product.id
      this.$http.delete(`${VITE_URL}api/${VITE_PATH}/cart/${product.id}`)
        .then(res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '成功刪除單一產品d(`･∀･)b',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
          this.getCart()
          this.loadingItem = ''
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '刪除單一品項失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    editNum (product) {
      const data = {
        product_id: product.id,
        qty: product.qty
      }
      this.loadingItem = product.id
      this.$http.put(`${VITE_URL}api/${VITE_PATH}/cart/${product.id}`, { data })
        .then(res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '成功修改數量',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
          this.getCart()
          this.loadingItem = ''
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '修改數量失敗(｡ŏ_ŏ)',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    returnRouter () {
      this.$router.push('/order')
    }
  },
  mounted () {
    this.getCart()
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
