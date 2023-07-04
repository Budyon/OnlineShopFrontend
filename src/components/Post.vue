<template>
  <div :style="{ background: post.color }" class="post handle">
    <div  @click="onClick" class="post-container">
      <div class="title-box">
        <h2>{{ post.name }}</h2>
        <p> {{ post.scope }}</p>
        <p> {{ post.unscoped }}</p>
        <p> {{ post.description }}</p>
        <p> {{ post.authorName }}</p>
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
  flex-wrap: wrap;
  padding: 0 100px;
  border-radius: 15px;
  position: relative;
  width: 22em;
  height: 30em;
  background-size: 22em 30em;
  box-shadow: 3px 3px 20px rgba(0,0,0,0.5);
  margin: auto;
  overflow: hidden;
}
 .title-box {
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: 2em;
}

h2{
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 1.4em;
  text-align: center;
}

p {
  margin-bottom: 15px;
}
.post {
  cursor: pointer;
  border-radius: 15px;
  margin: 35px;
} 
</style>