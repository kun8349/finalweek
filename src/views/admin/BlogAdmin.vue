<template>
    <div>
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
      <div class="text-end mt-4">
        <button class="btn btn-primary" type="button" @click="()=>openModal(true)">
          建立新的頁面
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th style="width: 200px">標題</th>
            <th style="width: 200px">作者</th>
            <th>描述</th>
            <th style="width: 100px">建立時間</th>
            <th style="width: 100px">是否公開</th>
            <th style="width: 120px">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.title }}</td>
            <td>{{ article.author }}</td>
            <td>{{ article.description }}</td>
            <td>{{ $filters.date(article.create_at) }}</td>
            <td>
              <span v-if="article.isPublic">已上架</span>
              <span v-else>未上架</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="()=>getArticle(article.id)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="()=>openDelArticleModal(article)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center mt-5">
        <Pagination :pages="pages" @emit-pages="getArticles"></Pagination>
      </div>
      <ArticleModal
        ref="articleModal"
        :article="tempArticle"
        :is-new="isNew"
        @update-article="updateArticle"
      ></ArticleModal>
      <DelModal :item="tempArticle" ref="delModal" @del-item="delArticle" />
    </div>
  </template>

<script>
import ArticleModal from '@/components/ArticleModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/PaginationView.vue'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      articles: [],
      isLoading: true,
      isNew: false,
      tempArticle: {},
      currentPage: 1,
      pages: {}
    }
  },
  components: {
    ArticleModal,
    DelModal,
    Pagination
  },
  methods: {
    getArticles (page = 1) {
      this.currentPage = page
      this.isLoading = true
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/admin/articles?page=${page}`)
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.articles = response.data.articles
            this.pages = response.data.pagination
          }
        }).catch(() => {
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
    getArticle (id) {
      this.isLoading = true
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/admin/article/${id}`)
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.openModal(false, response.data.article)
            this.isNew = false
          }
        }).catch(() => {
          this.isLoading = false
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'ID取得失敗(｡◕∀◕｡)',
            showConfirmButton: false,
            timer: 1000,
            toast: true
          })
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.isNew = true
      } else {
        this.tempArticle = { ...item }
        this.isNew = false
      }
      this.$refs.articleModal.openModal()
    },
    updateArticle (item) {
      this.tempArticle = item
      let api = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      let httpMethod = 'post'
      let status = '新增貼文'
      let title = '新增部落格成功d(`･∀･)b'
      let delTitle = '新增部落格失敗(｡◕∀◕｡)'
      this.isLoading = true
      if (!this.isNew) {
        api = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`
        httpMethod = 'put'
        status = '更新貼文'
        title = '修改部落格成功d(`･∀･)b'
        delTitle = '修改部落格失敗(｡◕∀◕｡)'
      }
      const articleComponent = this.$refs.articleModal
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((response) => {
          this.isLoading = false
          this.$httpMessageState(response, status)
          articleComponent.hideModal()
          this.getArticles(this.currentPage)
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
    openDelArticleModal (item) {
      this.tempArticle = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delArticle () {
      this.isLoading = true
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`)
        .then((response) => {
          this.isLoading = false
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getArticles(this.currentPage)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '刪除部落格成功d(`･∀･)b',
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
            title: '刪除部落格失敗(｡◕∀◕｡)',
            showConfirmButton: false,
            timer: 1000,
            toast: true
          })
        })
    }
  },
  mounted () {
    this.getArticles()
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
