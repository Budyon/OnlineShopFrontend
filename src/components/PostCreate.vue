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
      
      <b-button ref="buttonUpload" style="margin-top: 10px;" @click="onPickFile">Upload post picture</b-button>

      <input
        name="picture"
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"/>

      <b-button :disabled="isDisabled" type="button" class="button" @click="createPost" pill> Create </b-button>

      <p v-if="hasShowMessage">{{ messageCreatePost }}</p>
      <p v-if="hasShowError"> {{ errorCreatePost }} </p>

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

        messageCreatePost: '',
        errorCreatePost: '',
        hasShowMessage: false,
        hasShowError: false,
        image: null
      }    
    },

    methods: {    
      onPickFile () {
        this.$refs.fileInput.click()
      },

      onFilePicked (event) {
        const files = event.target.files
        let button = this.$refs.buttonUpload
        
        if(files.length) {
          button.style.backgroundColor = "blue"
          const fileReader = new FileReader()

          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
          })

          fileReader.readAsDataURL(files[0])
          
          this.image = files[0]
        } else {
           button.style.backgroundColor = "grey"
          }
0      },

      changeHasShowForm() {
        if(!this.hasShowForm) {
          this.hasShowForm = true
        } else {
          this.hasShowForm = false
        }
      },

      createPost() {
        
        let formData = new FormData()
        formData.append( 'picture', this.image)
        formData.append( 'name', this.formPost.name)
        formData.append( 'scope', this.formPost.scope)
        formData.append( 'unscoped', this.formPost.unscoped)
        formData.append( 'description', this.formPost.description)
        formData.append( 'authorName', this.formPost.authorName)
        
        const requestOptions = {
          method: 'POST',
          "Content-Type": "multipart/form-data",
          body: formData
        };

        fetch('http://localhost:3001/posts', requestOptions)
        .then(async response => {
          const data = await response.json()

          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          Object.keys(this.formPost).forEach((item) => {
            this.formPost[item] = ''
          })

          let button = this.$refs.buttonUpload
          button.style.backgroundColor = "grey"

          this.image = null
          this.messageCreatePost =  data.message
          this.hasShowMessage = true

          setTimeout(() => {
            this.hasShowMessage = false
          }, 3000);

          this.$emit('post-create')

        })
        .catch(error => {
          console.log(error)
          this.errorCreatePost = error
          this.hasShowError = true

          setTimeout(() => {
            this.hasShowError = false
          }, 3000)
        });
      }
    },

    computed: {
      isDisabled() {
        return  !(
          this.formPost.name  &&
          this.formPost.scope  &&
          this.formPost.unscoped  &&
          this.formPost.description  &&
          this.formPost.authorName !== '')
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
    display: block;
    margin: 10px 0 10px 10px;
    background: red;
    border: none;
  }

  #file-large {
    width: 200px;
  }
</style>