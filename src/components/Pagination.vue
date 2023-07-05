<template>
    <div id="pagination" v-cloak>
        <p>Selected page: {{ page }}</p>
        <pagination :records="total" v-model="page" :perPage="limit" @paginate="pageClick">
        </pagination>
    </div>
</template>

<script>
export default {
    props: {
      total: {
        type: Number,
        default: 0
      },
      limit: {
        type: Number,
        default: 25
      },
      selectedPage: {
        type: Number,
        default: 1
      }
    },
    methods: {
        pageClick: function(page) {
          this.$emit('page-click', page)
        }
    },
    data() {
      return {
        page: this.selectedPage,
      }
    }
}
</script>

<style scoped>
#pagination {
  align-items: center;
}

[v-cloak] {
  display: none;
}
</style>