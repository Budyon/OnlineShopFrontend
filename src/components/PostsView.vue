<template>
    <div>
      <b-input-group size="sm" class="mb-2" style="width: 400px">
        <b-input-group-prepend is-text>
          <b-icon
            icon="search"
            @click="handleSearch">
          </b-icon>
        </b-input-group-prepend>
        
        <b-form-input
          v-model="searchText"
          type="search"
          placeholder="Search. . ."
          @keyup="handleInput">
        </b-form-input>

      </b-input-group>
      
      <PostCreate @post-create="getPosts" v-if="!isLoading"/>
      
      <draggable v-model="posts" group="post" :Options="{ animation:500, handle:'.handle' }">
        <transition-group class="posts-container">
          <Post
          v-for="(post) in posts"
          :key="post.id"
          :post="post"
          @post-click="postClick(post)"
          />
        </transition-group>
      </draggable>
      
      <PostModal v-if="clickedPost" :post="clickedPost" v-show="hasShowModal" @close-click="hasShowModal=false" />
      <Pagination v-if="!isLoading" :total="total" :limit="limit" @page-click="pageClick" :selectedPage="page, posts"/>
      
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
import draggable from 'vuedraggable'
import PostModal from './PostModal.vue'
import Post from './Post.vue'
import PostCreate from './PostCreate.vue'

export default {
  components: {
    Post,
    PostModal,
    draggable,
    Pagination,
    PostCreate
  },
  data() {
    return {
      posts: [],
      searchText: '',
      clickedPost: null,
      isLoading: true,
      limit: 25,
      total: 0,
      colors: [],
      page: 1,
      hasShowModal: false,
      timeoutID: undefined,
    }
  },
    methods: {
    postClick(post) {
      this.hasShowModal = true
      this.clickedPost = post
    },

    getPosts() {
      const from = (this.page - 1) * this.limit

      fetch(`http://localhost:3001/posts/?page=${ this.page }&from=${ from }&limit=${ this.limit }&search=${ this.searchText }`)
      .then(response => response.json())
      .then(data => {
          this.total = data.total
          data.results.forEach((post) => {
            post.color = this.getRandomColor()
          })
          
          this.posts = data.results
          this.isLoading = false
      })
    },

    getRandomColor()  {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      if(!this.colors.includes(color)) {
        this.colors.push(color)
      }
      else {
        this.getRandomColor()
      }
      return color;
    },

    handleInput() {
      if (typeof this.timeoutID === "number") {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.handleSearch()
        
      }, 1000);
    },

    changeUrl() {

      let query = {
        ...(this.searchText !== '' ? {search: this.searchText} : {}),
        ...(this.page > 1 ? {page: this.page} : {})
      }

      this.$router.push({
        query
      }).catch(() => ({}))
    },
    
    handleSearch() {
      this.timeoutID = undefined
      this.limit = 25
      this.total = 0
      this.page = 1
      this.clickedPost = null
      this.changeUrl()
      this.getPosts()
    },

    pageClick(clickedPage) {
      this.page = clickedPage
      this.changeUrl()
      this.getPosts()
    },

  },
  mounted() {
    if(this.$route.query.search) {
      this.searchText = this.$route.query.search
    }

    const page = this.$route.query.page
    this.page = page ? parseInt(page, 10) : 1

    this.getPosts()
  }
}
</script>

<style scoped>
.posts-container {
  padding: 0 100px;
  display: flex;
  flex-wrap: wrap;
}
.input {
  text-align: center;
}

::placeholder {
  text-align: center; 
}

input {
  border-radius: 5px;
  height: 50px;
  width: 500px;
}

</style>