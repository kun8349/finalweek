<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-secondary text-black">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">訂單細節</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4">
                            <h2>用戶資料</h2>
                            <table class="table mt-2">
                                <tbody v-if="tempProduct.user">
                                    <tr>
                                        <th style="width:100px">姓名</th>
                                        <td>{{ tempProduct.user.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>email</th>
                                        <td>{{ tempProduct.user.email }}</td>
                                    </tr>
                                    <tr>
                                        <th>電話</th>
                                        <td>{{ tempProduct.user.tel }}</td>
                                    </tr>
                                    <tr>
                                        <th>地址</th>
                                        <td>{{ tempProduct.user.address }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-8">
                            <h2>訂單細節</h2>
                            <table class="table mt-2">
                                <tbody>
                                    <tr>
                                        <th style="width:100px">訂單編號</th>
                                        <td>{{ tempProduct.id }}</td>
                                    </tr>
                                    <tr>
                                        <th>下單時間</th>
                                        <td>{{ $filters.date(tempProduct.create_at) }}</td>
                                    </tr>
                                    <tr>
                                        <th>付款時間</th>
                                        <td>
                                            <span v-if="tempProduct.paid_date">{{ tempProduct.paid_date }}</span>
                                            <span v-else>時間不正確</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>付款狀態</th>
                                        <td>
                                            <span
                                                v-if="tempProduct.is_paid"
                                                class="text-success"
                                            >
                                                完成付款
                                            </span>
                                            <span v-else>尚未付款</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>總金額</th>
                                        <td>${{ tempProduct.total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2>選購商品</h2>
                            <table class="table mt-2">
                                <tbody>
                                    <tr v-for="product in tempProduct.products" :key="product.id+'訂單產品'">
                                        <th>{{ product.product.title }}</th>
                                        <td>{{ product.product.num }} / {{ product.product.unit }}</td>
                                        <td class="text-end">${{ product.total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="form-check d-flex justify-content-end">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckIndeterminate"
                                v-model="tempProduct.is_paid"
                            >
                            <label class="form-check-label" for="flexCheckIndeterminate">
                                <span v-if="tempProduct.is_paid">完成付款</span>
                                <span v-else>未付款</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-textSecondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="()=>$emit('update-order-status',tempProduct)">
                        修改付款狀態
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
    productOrder: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      tempProduct: {}
    }
  },
  mixins: [modalMixins],
  emits: ['update-order-status'],
  watch: {
    productOrder () {
      this.tempProduct = this.$props.productOrder
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
