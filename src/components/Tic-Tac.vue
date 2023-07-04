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
        // if(this.bool) {
        //   this.x = 'x'
        // } else {
        //   this.x = 'o'
        // }
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
    
  /* .square:nth-child(2) {
    clear: left;
    background-color: gray; 
    border: 5px solid yellow; 
 } */

  </style>