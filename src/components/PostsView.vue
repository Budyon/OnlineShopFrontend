<template>
    <div>
      <b-input-group size="sm" class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="search" @click="handleSearch"></b-icon>
        </b-input-group-prepend>
        <!-- v-model="searchText" -->
        <b-form-input  type="search" placeholder="Search. . ." @keyup="handleInput"></b-form-input>
      </b-input-group>

      <draggable v-model="posts" group="post" :Options="{ animation:500, handle:'.handle' }">
        <transition-group class="posts-container">
          <Post
            v-for="(post, index) in posts"
            :key="index"
            :post="post"
            @post-click="postClick(post)"
          />
        </transition-group>
      </draggable>

      <PostModal v-if="clickedPost" :post="clickedPost" v-show="hasShowModal" @close-click="hasShowModal=false"/>
      <Pagination v-if="!isLoading" :total="total" :limit="limit" @page-click="pageClick" :selected-page="page" />

    </div>
</template>

<script>
import Pagination from './Pagination.vue'
import draggable from 'vuedraggable';
import PostModal from './PostModal.vue'
import Post from './Post.vue'
export default {
  components: {
    Post,
    PostModal,
    draggable,
    Pagination,
  },
  data() {
    return {
      posts: [],
      updatedPosts: [],
      // searchText: 'cross+spawn',
      clickedPost: null,
      isLoading: true,
      limit: 25,
      total: 0,
      colors: [],
      page: 1,
      hasShowModal: false,
    }
  },
    methods: {
    postClick(post) {
      this.hasShowModal = true
      this.clickedPost = post
    },

    getPackages() {
      const from = (this.page - 1) * this.limit

      // fetch('http://localhost:3001/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8'
      //   },
      // }).then(response => response.json()).then(data => {
      //   console.log(data)
      // });

      fetch(`http://localhost:3001/posts/?page=${this.page}&from=${from}&limit=${this.limit}`)
      .then(response => response.json())
      .then(data => {
        console.log(this.page,from,this.limit)
        console.log(data)
          this.total = data.total
          data.results.forEach((post) => {
            post.color = this.getRandomColor()
          })
          this.posts = data.results
          this.isLoading = false
        })

      // fetch(`https://api.npms.io/v2/search?q=${this.searchText}&from=${from}&limit=${this.limit}`)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data)
      //     this.total = data.total
      //     data.results.forEach((post) => {
      //       post.color = this.getRandomColor()
      //     })
      //     this.posts = data.results
      //     this.isLoading = false
      //   })
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

    handleInput(value) {
      if(value.srcElement._value) this.handleSearch()
    },

    changeUrl() {
      this.$router.push({ query: {
        // q: this.searchText,
        page: this.page.toString() 
      }})
    },

    handleSearch() {
      // if(this.searchText !== this.$route.query.q){
      //   this.limit = 25
      //   this.total = 0
      //   this.page = 1
      //   this.changeUrl()
      //   this.getPackages()
      // } 
    },

    pageClick(page) {
      this.page = page
      this.changeUrl()
      this.getPackages()
    },

  },
  mounted() {
  //   if(this.$route.query.q) {
  //   this.searchText = this.$route.query.q
  // } else {
  //   this.$router.push({ query: { q: this.searchText } })
  // }

  // const page = this.$route.query.page

  // this.page = page ? parseInt(page, 10) : 1
  this.getPackages()
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