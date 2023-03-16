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
        <div class="row mt-13">
            <!-- 產品類別 -->
            <div class="col-lg-3">
                <div class="bg-secondary">
                    <h3 class="mb-0 p-4 fs-5 fw-semibold">產品類型</h3>
                    <ul class="list-unstyled bg-white">
                        <li class="p-4">
                            <a
                                class="fs-6 title-active d-block"
                                href="#/product"
                                @click="()=>filterItem(products,'全部商品')"
                                :class="{'text-primary' : this.changeColor=='全部商品'}"
                            >
                                全部商品
                            </a>
                        </li>
                        <li class=" p-4">
                            <a
                                class="fs-6 d-block"
                                data-bs-toggle="collapse"
                                href="#collapseCat"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseCat"
                                @click="()=>filterItem(productsAll,'貓咪專區')"
                                :class="{'text-primary' : this.changeColor=='貓咪專區'}"
                            >
                                貓咪專區
                            </a>
                            <div class="collapse" id="collapseCat">
                                <ul class="list-unstyled mt-4">
                                    <li
                                        v-for="(category,index) in categoryCat"
                                        :key="index+'categoryCat'"
                                        class="fs-6 d-block p-4 title-hover"
                                        @click="()=>filterItem(productsAll,category)"
                                        :class="{'text-primary' : this.changeColor==category}"
                                    >
                                        {{ category }}
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class=" p-4">
                            <a
                                class="fs-6 d-block"
                                data-bs-toggle="collapse"
                                href="#collapseDog"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseDog"
                                @click="()=>filterItem(productsAll,'狗狗專區')"
                                :class="{'text-primary' : this.changeColor=='狗狗專區'}"
                            >
                                狗狗專區
                            </a>
                            <div class="collapse" id="collapseDog">
                                <ul class="list-unstyled mt-4">
                                    <li
                                        v-for="(category,index) in categoryDog"
                                        :key="index+'categoryDog'"
                                        class="fs-6 d-block p-4 title-hover"
                                        @click="()=>filterItem(productsAll,category)"
                                        :class="{'text-primary' : this.changeColor==category}"
                                    >
                                        {{ category }}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 產品渲染 -->
            <div class="col-lg-9">
                <h4 class="p-4">
                  {{ changeColor }}
                </h4>
                <div class="row">
                    <div class="col-lg-3" v-for="product in products" :key="product.id">
                        <router-link :to="`/product/${product.id}`">
                            <div class="card border-0 rounded-0 mb-4 card-overlay">
                                <div class="position-relative">
                                    <img :src="product.imageUrl" class="card-img-top rounded-0" alt="貓咪產品">
                                    <div class="overlay d-flex justify-content-center align-items-end">
                                        <button
                                            type="button"
                                            class="mb-0 text-white m-0 p-2 bg-primary w-100 fs-5 d-flex justify-content-center opacity-75 btn btn-sm btn-primary btn-hover"
                                            @click.prevent="() => addToCart(product.id)"
                                            :disabled="loadingItem === product.id"
                                        >
                                            加入購物車
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body text-center">
                                    <h5 class="card-title text-hover-black">{{ product.title }}</h5>
                                    <p class="text-primary mb-1 fs-5">NT${{ product.price }}</p>
                                    <del class="text-textSecondary">NT${{ product.origin_price }}</del>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <template v-if="!currentPage == 0">
                    <div class="d-flex justify-content-center">
                        <Pagination :pages="pages" @emit-pages="getProducts"></Pagination>
                    </div>
                </template>
                <template v-else></template>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/PaginationView.vue'
import { mapActions, mapState } from 'pinia'
import cartStore from '../../stores/cart.js'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      products: {},
      isLoading: true,
      //
      currentPage: 1,
      pages: {},
      // 所有產品
      productsAll: [],
      changeColor: '全部商品',
      // 分類
      categoryCat: [],
      categoryDog: []
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.currentPage = page
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/products/?page=${page}`)
        .then(res => {
          this.products = res.data.products
          this.pages = res.data.pagination
          this.isLoading = false
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '取得產品資料失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getProductsAll () {
      this.isLoading = true
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/products/All`)
        .then(res => {
          this.productsAll = res.data.products
          // 用includes判斷是否包含重複的category 貓咪
          const catData = this.productsAll.filter(item => item.category.includes('貓'))
          const feedingCat = this.productsAll.filter(item => item.category === '餵食容器')
          this.categoryProductCat = catData.concat(feedingCat)
          this.categoryProductCat.forEach(item => {
            if (!this.categoryCat.includes(item.category)) {
              this.categoryCat.push(item.category)
            }
          })
          // 用includes判斷是否包含重複的category 狗狗
          const dogData = this.productsAll.filter(item => item.category.includes('狗'))
          const feedingDog = this.productsAll.filter(item => item.category === '餵食容器')
          this.categoryProductDog = dogData.concat(feedingDog)
          this.categoryProductDog.forEach(item => {
            if (!this.categoryDog.includes(item.category)) {
              this.categoryDog.push(item.category)
            }
          })
          this.isLoading = false
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '取得產品資料失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    filterItem (product, item) {
      this.isLoading = true
      this.changeColor = item
      if (item === '全部商品') {
        this.getProducts()
        this.isLoading = false
      } else if (item === '貓零食') {
        let ary = []
        ary = product.filter(i => i.category === '貓零食')
        this.products = ary
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '貓飼料') {
        let ary = []
        ary = product.filter(i => i.category === '貓飼料')
        this.products = ary
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '貓主食罐') {
        let ary = []
        ary = product.filter(i => i.category === '貓主食罐')
        this.products = ary
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '貓抓板') {
        let ary = []
        ary = product.filter(i => i.category === '貓抓板')
        this.products = ary
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '貓咪玩具') {
        let ary = []
        ary = product.filter(i => i.category === '貓咪玩具')
        this.products = ary
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '餵食容器') {
        let ary = []
        ary = product.filter(i => i.category === '餵食容器')
        this.products = ary
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '狗飼料') {
        let ary = []
        ary = product.filter(i => i.category === '狗飼料')
        this.products = ary
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '狗主食罐') {
        let ary = []
        ary = product.filter(i => i.category === '狗主食罐')
        this.products = ary
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '貓咪專區') {
        const catData = this.productsAll.filter(item => item.category.includes('貓'))
        const feedingCat = this.productsAll.filter(item => item.category === '餵食容器')
        const categoryProductCat = catData.concat(feedingCat)
        this.products = categoryProductCat
        this.currentPage = 0
        this.isLoading = false
      } else if (item === '狗狗專區') {
        const dogData = this.productsAll.filter(item => item.category.includes('狗'))
        const feedingDog = this.productsAll.filter(item => item.category === '餵食容器')
        const categoryProductDog = dogData.concat(feedingDog)
        this.products = categoryProductDog
        this.currentPage = 0
        this.isLoading = false
      }
    },
    ...mapActions(cartStore, ['addToCart'])
  },
  mounted () {
    this.getProducts()
    this.getProductsAll()
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    ...mapState(cartStore, ['loadingItem'])
  }
}
</script>

<style lang="scss" scoped>
.my-toast {
  font-size: 5px;
  max-width: 500px;
  max-height: 500px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
}
.card-overlay:hover .overlay {
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
}
.btn-hover:hover{
    opacity: 1 !important;
}
.title-hover:hover{
    cursor: pointer;
    color: #D02090;
}
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
