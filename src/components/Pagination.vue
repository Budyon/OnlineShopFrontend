<template>
  <div id="pagination" v-cloak>
    <p> Selected page: {{ selectedPage }} </p>

    <pagination
      :records="total"
      v-model="page"
      :perPage="limit"
      @paginate="pageClick">
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
    },
  },

  data() {
    return {
      page: 1,
    }
  },

  methods: {
    pageClick(page) {
      console.log(this.selectedPage);
      this.$emit('page-click', page)
    },
  },

  mounted() {
    if(this.$route.query.page) this.page = Number(this.$route.query.page)
  },
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