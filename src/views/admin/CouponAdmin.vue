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
    <div>
      <div class="text-end mt-4">
        <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
          建立新的優惠券
        </button>
      </div>
      <table class="table mt-4">
        <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                      @click="openCouponModal(false, item)"
              >編輯</button>
              <button class="btn btn-outline-danger btn-sm"
                      @click="openDelCouponModal(item)"
              >刪除</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <Pagination :pages="pages" @emit-pages="getCoupons"></Pagination>
      </div>
      <CouponModal
        :coupon="tempCoupon"
        :is-new="isNew"
        ref="couponModal"
        @update-coupon="updateCoupon"
      />
      <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"/>
    </div>
  </template>

<script>
import Swal from 'sweetalert2'
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/PaginationView.vue'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  components: { CouponModal, DelModal, Pagination },
  props: {
    config: Object
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      pages: {},
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/coupons`, this.tempProduct)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pages = res.data.pagination
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '資料取得失敗(｡◕∀◕｡)',
            showConfirmButton: false,
            timer: 1000,
            toast: true
          })
        })
    },
    // 開啟優惠券modal
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    // 開啟刪除modal
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    // 更新優惠券狀態
    updateCoupon (tempCoupon) {
      this.isLoading = true
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`
      let httpMethos = 'post'
      let data = tempCoupon
      let title = '新增優惠券成功d(`･∀･)b'
      let delTitle = '新增優惠券失敗٩(ŏ﹏ŏ、)۶'

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`
        httpMethos = 'put'
        data = this.tempCoupon
        title = '修改優惠券成功d(`･∀･)b'
        delTitle = '修改優惠券失敗٩(ŏ﹏ŏ、)۶'
      }

      this.$http[httpMethos](url, { data })
        .then((res) => {
          this.isLoading = false
          this.getCoupons()
          this.$refs.couponModal.hideModal()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
        })
        .catch(() => {
          this.isLoading = false
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: delTitle,
            showConfirmButton: false,
            timer: 1000,
            toast: true
          })
        })
    },
    // 刪除優惠券
    delCoupon () {
      this.isLoading = true
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`)
        .then((res) => {
          this.isLoading = false
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getCoupons()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '刪除優惠券成功d(`･∀･)b',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
        })
        .catch(() => {
          this.isLoading = false
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '刪除優惠券失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1000,
            toast: true
          })
        })
    }
  },
  mounted () {
    this.getCoupons()
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
