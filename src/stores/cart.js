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
      loadingItem: ''
    }
  },
  // 概念同「methods」
  actions: {
    // 可使用 this 使用 state 的資料內容
    getToCart () {
      axios.get(`${VITE_URL}api/${VITE_PATH}/cart`)
        .then(res => {
          this.cart = res.data.data.carts
          this.total = res.data.data.total
          this.finalTotal = res.data.data.finalTotal
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
            title: '加入購物車成功(ﾉ>ω<)ﾉ',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
          this.getToCart()
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '加入購物車失敗(‘⊙д-)',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  },
  // 概念同「computed」
  getters: {}
})
export default cartStore
