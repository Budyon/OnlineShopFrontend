<template>
  <div>
    <b-button @click="changeHasShowForm" style="margin-left: 10px;" pill> Create Post</b-button> 
    
    <b-form @submit="createPost" v-if="hasShowForm">

      <b-form-input
        v-model="formPost.name"
        class="input"
        type="text"
        placeholder="name"
        >
      </b-form-input>
      
      <b-form-input
        v-model="formPost.scope"
        class="input"
        type="text"
        placeholder="scope"
        >
      </b-form-input>
      
      <b-form-input
        v-model="formPost.unscoped"
        class="input"
        type="text"
        placeholder="unscoped"
        >
      </b-form-input>
      
      <b-form-input
        v-model="formPost.description"
        class="input"
        type="text"
        placeholder="description"
      >
      </b-form-input>
    
      <b-form-input
        v-model="formPost.authorName"
        class="input"
        type="text"
        placeholder="author name"
      >
      </b-form-input>

      <b-button :disabled="isDisabled" type="button" class="button" @click="createPost" pill> Create </b-button>

      <p v-if="hasShowMessage" ref="message" >{{ messageCreatePost }}</p>

    </b-form>
  </div> 
  </template>

  <script>

  export default {
    data() {
      return {
        hasShowForm: false,
        formPost: {
          name: '',
          scope: '',
          unscoped: '',
          description: '',
          authorName: '',
        },
        hasInputsEmpty: true,
        messageCreatePost: '',
        hasShowMessage: false,
      }    
    },

    methods: {
      changeHasShowForm() {
        if(!this.hasShowForm) {
          this.hasShowForm = true
        } else {
          this.hasShowForm = false
        }
      },

      createPost() {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
          { name: this.formPost.name,
            scope: this.formPost.scope,
            unscoped: this.formPost.unscoped,
            description: this.formPost.description,
            authorName: this.formPost.authorName
          })
        };

        fetch('http://localhost:3001/posts', requestOptions)
        .then(async response => {
          const data = await response.json();

          Object.keys(this.formPost).forEach((item) => {
            this.formPost[item] = ''
          })

          this.messageCreatePost =  data.message
          this.hasShowMessage = true

          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      }
    },

    computed: {
      isDisabled() {
        console.log('comp')
        if(this.formPost.name  && this.formPost.scope  && this.formPost.unscoped  && this.formPost.description  && this.formPost.authorName !== '') {
          setTimeout(() => {
          this.hasShowMessage = false
        }, 3000);

          return  false
        } else {
          return true
        }
      },
    },
  }
</script>

<style scoped >
  .input {
    margin-top: 10px;
    width: 500px;
  }

  .button {
    margin: 10px 0 10px 10px;
    background: red;
    border: none;
  }
</style>