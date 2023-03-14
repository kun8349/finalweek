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
    <div class="mb-5 mt-10 text-end">
        <button type="button" class="btn btn-primary" @click="()=>openModal('new')">建立新產品</button>
    </div>
    <table class="table">
        <thead>
            <tr>
            <th width="100px">分類</th>
            <th>產品名稱</th>
            <th width="120px">原價</th>
            <th width="120px">售價</th>
            <th width="100px">是否啟用</th>
            <th width="120px">編輯</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr v-for="item in productList" :key="item.id+'後台產品列表'">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.origin_price }}</td>
              <td>{{ item.price }}</td>
              <td>
                  <span class="text-success" v-if="item.is_enabled">啟用</span>
                  <span v-else>未啟用</span>
              </td>
              <td>
                  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" class="btn btn-outline-primary btn-sm" @click="()=>openModal('edit',item)">編輯</button>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        @click="()=>openDelProductModal(item)"
                      >
                        刪除
                      </button>
                  </div>
              </td>
            </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <Pagination :pages="pages" @emit-pages="getProducts"></Pagination>
    </div>
    <ProductModal
      @update-product="updateProduct"
      :product="tempProduct"
      :isNew="isNew"
      ref="productModal"
    />
    <DelModal :item="tempProduct" @del-item="delProduct" ref="delModal"></DelModal>
</template>

<script>
import ProductModal from '@/components/ModalProduct.vue'
import Pagination from '@/components/PaginationView.vue'
import DelModal from '@/components/DelModal.vue'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      isLoading: true,
      fullPage: false,
      color: '#BBFFFF',
      isNew: true,
      productList: [],
      tempProduct: {
        imagesUrl: []
      },
      currentPage: 1,
      pages: {}
    }
  },
  components: {
    ProductModal,
    Pagination,
    DelModal
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.currentPage = page
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/admin/products/?page=${page}`)
        .then(res => {
          this.productList = res.data.products
          this.pages = res.data.pagination
          this.isLoading = false
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '資料取得失敗,請重新登入٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1000
          })
        })
    },
    createImg () {
      this.product.imagesUrl = []
      this.product.imagesUrl.push('')
    },
    openModal (type, item) {
      if (type === 'new') {
        this.isNew = true
        this.tempProduct = {
          imagesUrl: []
        }
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      this.isLoading = true
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`
      let http = 'post'
      let title = '新增產品成功d(`･∀･)b'
      let delTitle = '新增產品失敗٩(ŏ﹏ŏ、)۶'
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
        http = 'put'
        title = '修改產品成功d(`･∀･)b'
        delTitle = '修改產品失敗٩(ŏ﹏ŏ、)۶'
      }
      this.$http[http](url, { data: this.tempProduct })
        .then((response) => {
          const productComponent = this.$refs.productModal
          productComponent.hideModal()
          this.getProducts()
          this.isLoading = false
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
            icon: 'success',
            title: delTitle,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delProduct () {
      this.isLoading = true
      this.$http.delete(`${VITE_URL}api/${VITE_PATH}/admin/product/${this.tempProduct.id}`)
        .then(() => {
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getProducts(this.currentPage)
          this.isLoading = false
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '成功刪除單一產品d(`･∀･)b',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
        })
        .catch(() => {
          this.isLoading = false
          Swal.fire({
            icon: 'success',
            title: '刪除單一品項失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  },
  mounted () {
    this.getProducts()
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
