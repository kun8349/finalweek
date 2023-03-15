import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
const cartStore = defineStore('cart', {
  state: () => {
    return {
      cart: [],
      total: 0,
      finalTotal: 0,
      loadingItem: '',
      isToLoading: false,
      // 折扣的錢
      couponPrice: 0,
      orderPrice: 0
    }
  },
  // 概念同「methods」
  actions: {
    // 可使用 this 使用 state 的資料內容
    getToCart () {
      this.isToLoading = true
      axios.get(`${VITE_URL}api/${VITE_PATH}/cart`)
        .then(res => {
          this.cart = res.data.data.carts
          this.total = res.data.data.total
          this.finalTotal = res.data.data.finalTotal
          this.isToLoading = false
        })
    },
    addToCart (item, qty = 1) {
      const data = {
        product_id: item,
        qty
      }
      this.loadingItem = item
      axios.post(`${VITE_URL}api/${VITE_PATH}/cart`, { data })
        .then(res => {
          this.isLoading = false
          this.loadingItem = ''
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '加入購物車成功',
            padding: '5px',
            width: '280px',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            showCloseButton: true
          })
          this.getToCart()
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '加入購物車失敗(‘⊙д-)',
            showCloseButton: true,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: '50px'
            }
          })
        })
    },
    deleteSingle (product) {
      this.loadingItem = product.id
      axios.delete(`${VITE_URL}api/${VITE_PATH}/cart/${product.id}`)
        .then(res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '成功刪除單一產品',
            showCloseButton: true,
            showConfirmButton: false,
            padding: '5px',
            width: '280px',
            timer: 1500,
            toast: true
          })
          this.getToCart()
          this.loadingItem = ''
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '刪除單一品項失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 1500,
            customClass: {
              container: '50px'
            }
          })
        })
    },
    getCoupon (item) {
      const data = {
        code: String(item)
      }
      axios.post(`${VITE_URL}api/${VITE_PATH}/coupon`, { data })
        .then(res => {
          const price = res.data.data.final_total
          parseInt(price)
          this.couponPrice = Math.floor(price)
          this.orderPrice = this.total - this.couponPrice
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '優惠券折扣成功',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
        })
        .catch(() => {
          this.couponPrice = 0
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '不存在此優惠券',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
        })
    }
  },
  // 概念同「computed」
  getters: {}
})
export default cartStore
