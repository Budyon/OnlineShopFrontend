<template>
  <div>
    <div  @click="onClick" class="post-container">
      <div class="post-info d-flex">
        <img class="image" v-if="post.image" :src="'http://localhost:3001/' + post.image">
        <span>{{ post.name }}</span>
        <span> {{ post.scope }}</span>
        <span> {{ post.unscoped }}</span>
        <span> {{ post.description }}</span>
        <span> {{ post.authorName }}</span>
        <span class="date-post"> {{ post.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
      post: {
        type: Object,
        default: {}
      },
    },
    methods: {
        onClick() {
          this.$emit('post-click')
        }
    }
}
</script>

<style scoped>

.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  box-shadow: 14px 15px 20px rgba(0,0,0,0.5);
  margin: auto;
  overflow: hidden;
  border-radius: 15px;
}

.d-flex {
  display: flex;
}
.post-info {
  flex-direction: column;
  gap: 20px;
  text-align: center;
}

h2 {
  font-weight: 500;
  font-size: 1.4em;
  text-align: center;
}
.post {
  cursor: pointer;
  margin: 35px;
}
.image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.date-post {
  font-size: 12px;
  text-align: end;
  font-style: oblique;
  padding: 5px
}
</style>