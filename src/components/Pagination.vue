<template>
  <div id="pagination" v-cloak>
    <p v-if="hasSHowSelectedPage"> Selected page: {{ selectedPage }}</p>

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
    posts: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      page: this.selectedPage,
      hasSHowSelectedPage: false
    }
  },

  methods: {
    pageClick: function(page) {
      this.$emit('page-click', page)
    }
  },

  updated() {
    this.page = this.selectedPage
  },

  mounted() {
    if(this.posts.length > 0) {
      this.hasSHowSelectedPage = true
    }
  }
}

</script>

<style scoped>
#pagination {
  align-items: center;
}

.VuePagination__count {
  color: red;
}

[v-cloak] {
  display: none;
}
</style>