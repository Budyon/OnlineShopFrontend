<template>
    <div class="modal-overlay">
      <div class="custom-modal">
        <img class="close-img" @click="onClick" src="../assets/close.svg" alt="" contain>
        <img class="post-img" v-if="post.image" :src="'http://localhost:3001/' + post.image">
        <div class=" post-info d-flex" >
          <span> {{ post.name }}</span> 
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
          this.$emit('close-click')
        }
      },
  }
  </script>


<style scoped>

.d-flex {
  display: flex;
}
.modal-overlay {
  display: flex;
  position: fixed;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #00000066;
  justify-content: center;
}

.custom-modal {
  background-color:#9E9E9E;
  border-radius: 10px;
}

p {
  font-size: 16px;
  margin: 0;
  margin-bottom: 28px;
  cursor: pointer;
}

.close-img {
  position: absolute;
  right: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  z-index: 1;
}

.post-img {
  object-fit: cover;
  width: 440px;
  height: 200px;
  border-radius: 10px 10px 0 0;
}
.post-info {
  width: 440px;
  height: 260px;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  text-align: center;
}

.date-post {
  font-size: 12px;
  text-align: end;
  font-style: oblique;
}

</style>