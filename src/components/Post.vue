<template>
  <div :style="{ background: post.color }" class="post handle">
    <div  @click="onClick" class="post-container">
      <div class="title-box">
        <h2 v-if="post.image">{{ Object.keys(post)[6] }}</h2>
        <img v-if="post.image" style="width: 100px;height:100px" :src="'http://localhost:3001/' + post.image">
        <h2>{{ Object.keys(post)[1] }}</h2>
        <span>{{ post.name }}</span>
        <h2>{{ Object.keys(post)[2] }}</h2>
        <span> {{ post.scope }}</span>
        <h2>{{ Object.keys(post)[3] }}</h2>
        <span> {{ post.unscoped }}</span>
        <h2>{{ Object.keys(post)[4] }}</h2>
        <span> {{ post.description }}</span>
        <h2>{{ Object.keys(post)[5] }}</h2>
        <span> {{ post.authorName }}</span>
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
  box-shadow: 14px 15px 20px rgba(0,0,0,0.5);
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
  font-weight: 500;
  font-size: 1.4em;
  text-align: center;
}

.post {
  cursor: pointer;
  border-radius: 15px;
  margin: 35px;
} 

</style>