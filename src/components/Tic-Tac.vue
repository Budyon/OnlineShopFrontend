<template>
    <div  @click="onClick" class="square">
      <h2 id="test" v-if="square.state">{{ square.state }}</h2>
    </div>
</template>
  
  <script>
  export default {
    props: {
      square: {
        type: Object,
        required: true,
      },
      },
    data() {
      return {
        x: '',
      }
    },
    methods: {
      onClick() {
        if (!this.square.state) {
          this.$emit('square-click')
        }
      }
    },
  }
  </script>
  
  <style scoped>
    .square {
      text-align: center;
      background: red;
      height: 100px;
      width: 100px;
    }
  </style>