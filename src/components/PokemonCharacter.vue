<template>
    <div class="caracter">
                <router-link :to="{ name: 'character', params: { id:pokemon.id } }">
                <div class="pic">
                    <!-- <img :src="getImg(pokemon.id)" alt=""> -->
                    <img :src="pokemon.sprite" alt="">
                </div>
                </router-link>
                <div class="info">
                    <div class="identification">
                        <h4 class="name" >{{pokemon.name}}</h4>
                        <span class="number">#{{pokemon.id}}</span>
                    </div>
                    <div class="types">
                        <span class="type "  :class="type.name"
                            v-for="(type,index) in pokemon.types" :key="index">
                            {{getType(type.name)}}
                        </span>
                    </div>
                </div>
    </div>
    
</template>


<script>

export default {
    name:'PokemonChararter',
    props:[
        'pokemon'
    ],
    data:function()
    {
        return {

        }
    },

    methods:{
        getImg(id) {
            return require("../assets/pokemon/" + id + ".png");
        },
        getType(type){
            return type?type.toUpperCase():"Unknown";
        }
    },
    computed:{
        img:function(id){
            return "../assets/pokemon/" + id + ".png"
        }
    }

    
}

</script>

<style scoped>
 .caracter{
        padding:5px;
        width:100%;
        margin-bottom:40px;
    }
    .caracter a .pic{  
        background-color: rgba(255, 255, 255, 0.22);
        border-radius:7px;
        display:flex;
        justify-content:center;
        align-items:center;
        height:35vh;
    }
    .caracter a .pic img{
        width:70%;
        /* margin:auto; */
        max-height: 30vh;
    }

    .caracter .info{
        margin-top:10px;
    }
    .caracter .info .identification{
        display:flex;
        justify-content:space-between;
        align-items:flex-end;
        
    }
    .caracter .info .identification .name{
        margin-right:20px;
        color:white;
        font-size:1.4em;
        font-weight:500;
        text-transform: capitalize;
    }
    .caracter .info .identification .number{
        font-size:1.4em;
        color:rgb(146, 142, 142);
    }
    .caracter a:hover .pic {
        opacity:0.8;
        transition:0.2s opacity;
    }

    .caracter .info .types{
        margin-top:10px;
        display:flex;
        justify-content: center;;
        align-items:flex-start;
        flex-wrap: wrap;
    }
    .caracter .info .type{
        margin-right:10px;
        margin-bottom:10px;
        min-width:90px;
        /* border:1px solid rgb(141, 138, 138); */
        text-align:center;
        padding:8px 10px;
        border-radius:3px;
        color:white;
        background-color:dodgerblue;
    }

    .caracter .info .type:hover{
        opacity:0.8;
        transition:0.2s opacity;
        cursor:pointer;
    }


  @media(min-width:425px){
        .caracter a .pic{  
            min-height:40vh;
        }
     }
@media(min-width:768px){
    
    .caracter{
        padding:5px;
        width:45%;
        margin-bottom:40px;
    }
    .caracter .info .types{
        display:flex;
        justify-content: flex-start;
    }
     .caracter .info .type{
        min-width:70px;
        padding:4px 10px;
        font-size:0.9em;
     }

}
@media(min-width:1024px){
    

    .caracter{
        padding:5px;
        width:24%;
        margin-bottom:40px;
        margin-right:1.001%;
    }
    .caracter .info .types{
        display:flex;
        justify-content: flex-start;
    }

}

</style>