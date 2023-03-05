<template>
    
    <header class="container">
        <div class="logo">
            <router-link to="/">
                <img src="../assets/logo1.png" alt="">
                <span>Pokedex</span>
            </router-link>
        </div>
        <div class="search-bar">
            <div class="search-input" >
                <input type="text" v-model="searchText" v-on:keyup.enter="$emit('search',searchText)"  placeholder="Nome ou numero">
                <i class="fas fa-search"></i>
            </div>
        </div>
    </header>

</template>

<script>

export default {
    name:"SiteHeader",
    data:function(){
        return {
            searchText: ''
        }
    },
    methods:{
        add:function(){
            
        }
    },
    watch:{
        searchText(){
            console.log(this.searchText);
        }
    }
}

</script>

<style scoped>
    header{
        min-height:50px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding-top:15px;
        padding-bottom:10px;
    }

    .logo a{
        display:flex;
        align-items:center;
    }
    .logo a img{
        width:100px;
        margin-right:5px;
    }
    .logo a span{
        color:white;
        display:none !important;
    }

    a:hover{
        opacity:0.9;
        transition:0.2s opacity;
    }

    .search-input{
        padding:5px 10px;
        background-color: rgba(255, 255, 255, 0.22);
        border-radius:5px;
        width:160px;
        display:flex;
        align-items:center;
        justify-content:space-between;

    }
    .search-input input{        
        background-color: transparent;
        border:none;
        outline:none;
        color: #ffffff;
        /* font-family: "Montserrat"; */
        flex: 1;
        font-size:1em;
        width:80%;
        padding:5px 0px;
    }
     .search-input i{
        width:10%;
        color: #d8d5d5;
     } 

     @media(min-width:375px){
        .search-input{
            width:190px;
        }
        .logo a img{
        width:120px;
        margin-right:5px;
    }
     }

     @media(min-width:425px){
        .logo a span{
            color:white;
            /* display:block !important; */
        }
        .logo a img{
        width:140px;
        margin-right:5px;
    }
     }

     @media(min-width:768px){
        .logo a span{
            font-size:1.5em;
        }
        .logo a img{
        width:145px;
        margin-right:5px;
    }
     }

    @media(min-width:1024px){
        .search-input{
                width:250px;
        }

    }
    
</style>