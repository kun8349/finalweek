<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li
                class="page-item"
                :class="{  disabled : !pages.has_pre}"
            >
                <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    @click.prevent="()=>updatePage(pages.current_page -1)"
                >
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li
                class="page-item" v-for="(page,key) in pages.total_pages"
                :key="key+'page'"
                :class="{  active: page === pages.current_page}"
            >
                <span
                    v-if="page === pages.current_page" class="page-link" href="#"
                    @click.prevent="()=>updatePage(page)"
                >
                    {{ page }}
                </span>
                <a
                    v-else class="page-link" href="#"
                    @click.prevent="updatePage(page)"
                >
                    {{ page }}
                </a>
            </li>
            <li
                class="page-item"
                :class="{  disabled : !pages.has_next}"
            >
                <a
                    class="page-link"
                    href="#" aria-label="Next"
                    @click.prevent="()=>updatePage(pages.current_page +1)"
                >
                    <span aria-hidden="true">
                        &raquo;
                    </span>
                </a>
            </li>
            </ul>
    </nav>
</template>

<script>
export default {
  props: ['pages', 'getProducts'],
  methods: {
    updatePage (page) {
      this.$emit('emitPages', page)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
