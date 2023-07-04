<template>
    <div class="header-block">
        <div>
            <h2>POSTS</h2>
        </div>
        <div class="info">
            <router-link to="/header">Home</router-link>    
            <router-link to="/posts">Posts</router-link>          
            <router-link to="/game">Game</router-link>     
        </div>
        
    </div>
</template>

<style scoped>
    h2 {
        cursor: pointer;
        color: white;
    }

    .header-block {
        padding: 10px;
        height: 80px;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    a {
        font-family: serif;
        font-size: 18px;
        text-decoration: none;
        color: white;
    }

    a:hover {
        transition: 0.7s;
        color: red;
    }

    .info {
        display: flex;
        min-width: 400px;
        justify-content: space-between;
    }

</style>