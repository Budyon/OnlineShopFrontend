<template>
    <div class="modal-overlay">
      <div class="custom-modal">
        <button @click="onClick" style="color:red">X</button>
        <p> {{ post.name }}</p> 
        <p> {{ post.scope }}</p>
        <p> {{ post.unscoped }}</p>
        <p> {{ post.description }}</p>
        <p> {{ post.authorName }}</p>
        <div class="close">
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
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.custom-modal {
  text-align: center;
  background-color: palevioletred;
  height: 350px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}

p {
  font-size: 16px;
  margin: 0;
  margin-bottom: 28px;
}

button {
  color: red;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  font-size: 14px;
}
</style>