<template>
    <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref="modal"
    >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!--標題-->
            <div class="modal-header bg-secondary text-black">
                <h5 class="modal-title text-white" id="productModalLabel">
                    <span v-if='isNew===true'>新增產品</span>
                    <span v-else>編輯產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-4">
                        <div class="mb-4">
                            <label class="form-label">主要圖片</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="請輸入圖片網址"
                                v-model="tempProduct.imageUrl"
                            >
                            <span v-if="!tempProduct.imageUrl"></span>
                            <img v-else :src="tempProduct.imageUrl" alt="主要圖片" class="img-fluid mt-3">
                        </div>
                        <div v-if="Array.isArray(tempProduct.imagesUrl)">
                            <div
                                class="mb-4"
                                v-for="(img,key) in tempProduct.imagesUrl"
                                :key="key+'img'"
                            >
                                <label class="form-label">圖片網址</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="請輸入圖片網址"
                                    v-model="tempProduct.imagesUrl[key]"
                                >
                                <span v-if="!img"></span>
                                <img v-else :src="img" alt="次要圖片" class="img-fluid mt-3">
                            </div>
                            <div
                                v-if="!tempProduct.imagesUrl.length ||
                                tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                            >
                                <button
                                    type="button"
                                    class="btn btn-outline-primary btn-sm w-100"
                                    @click="() => tempProduct.imagesUrl.push('')"
                                >
                                新增圖片
                                </button>
                            </div>
                            <div v-else>
                                <button
                                    type="button"
                                    class="btn btn-outline-danger btn-sm w-100"
                                    @click="() => tempProduct.imagesUrl.pop()"
                                >
                                    刪除圖片
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="mb-3">
                            <label class="form-label">產品名稱</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="請輸入產品名稱"
                                v-model="tempProduct.title"
                            >
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label">分類</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="請輸入分類"
                                        v-model="tempProduct.category"
                                    >
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label">單位</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="請輸入單位"
                                        v-model="tempProduct.unit"
                                    >
                                </div>
                            </div>
                            <div class="col-6">
                                <div>
                                    <label class="form-label">原價</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="請輸入原價"
                                        min="0"
                                        v-model.number="tempProduct.origin_price"
                                    >
                                </div>
                            </div>
                            <div class="col-6">
                                <div>
                                    <label class="form-label">售價</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="請輸入售價"
                                        min="0"
                                        v-model.number="tempProduct.price"
                                    >
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="mb-3">
                            <label class="form-label">產品描述</label>
                            <textarea
                                class="form-control"
                                rows="2"
                                placeholder="請輸入產品描述"
                                v-model="tempProduct.description"
                            >
                            </textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">說明內容</label>
                            <textarea
                                class="form-control"
                                rows="2"
                                placeholder="請輸入說明內容"
                                v-model="tempProduct.content"
                            >
                            </textarea>
                        </div>
                        <div>
                            <div class="mb-3">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id='is_enabled'
                                    v-model='tempProduct.is_enabled'
                                    :true-value='1'
                                    :false-value='0'
                                >
                                <label class="form-check-label" for="is_enabled">
                                    是否啟用
                                </label>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-outline-textSecondary"
                    data-bs-dismiss="modal"
                >
                    取消
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="$emit('update-product', tempProduct)"
                >
                    確認
                </button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import modalMixins from '@/mixins/modalMixins'
export default {
  props: {
    product: {
      type: Object,
      default () { return {} }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: {},
      modal: '',
      tempProduct: {}
    }
  },
  emits: ['update-product'],
  mixins: [modalMixins],
  watch: {
    product () {
      this.tempProduct = this.product
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
