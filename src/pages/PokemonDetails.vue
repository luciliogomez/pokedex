<template>
    <div class="container"> 
        <div class="arrow arrow-left">
            <router-link :to="{ name: 'character', params: { id:getPrev()} }" >
                <i class="fas fa-chevron-left"></i>
            </router-link>
            <!-- <a :href="'/character/'+getPrev()" >
                <i class="fas fa-chevron-left"></i>
            </a> -->
        </div>
        <div class="arrow arrow-right">
            <router-link :to="{ name: 'character', params: { id:getNext()} }" >
                <i class="fas fa-chevron-right"></i>
            </router-link>
            <!-- <a :href="'/character/'+getNext()" >
                <i class="fas fa-chevron-right"></i>
            </a> -->
        </div>
        <div class="caracter ">
                
                <div class="pic">
                    <img :src="pokemon.img" alt="" >
                </div>
                
                <div class="info">
                    <div class="identification">
                        <span class="number">#{{pokemon.id}}</span>
                        <h4 class="name">{{pokemon.name}}</h4>
                     </div>
                    <div class="types">
                        <span class="type "  :class="type.name"
                            v-for="(type,index) in pokemon.types" :key="index">
                            {{getType(type.name)}}
                        </span>
                    </div>
                </div>
        </div>

        <div class="stats">
            <h2>Stats</h2>
            <div>
                <h3  v-for="(stat,index) in pokemon.stats" :key="index">{{stat.name}}: <span>{{stat.base}}</span></h3>
            </div>
        </div>
    </div>
    
</template>


<script>

import api from "../services/api.js"
export default {
    name:'PokemonDetails',
    props:[
        // 'pokemon'
    ],
    data:function()
    {
        return {
            pokemon :{
                id:'1',
                    name:'Bulbasaur',
                    number:'1',
                    types:[
                        {name:"grass"},
                        {name:"poison"}
                    ]
            },
            id: this.$route.params.id
        }
    },

    methods:{
        getImg(id) {
            return require("../assets/pokemon/" + id + ".png");
        },
        getType(type){
            return type.toUpperCase();
        },
        getNext(){
            let id = parseInt(this.$route.params.id) + 1;
            return id;
        },
        getPrev(){
            let id = parseInt(this.$route.params.id) - 1;
            return ((id<=0)?1:id);
        },
        async loadChar(){
            let pokemon = {};
                await api.get("https://pokeapi.co/api/v2/pokemon/"+this.$route.params.id).
                                then(function(response){
                                    
                                        let character = response.data;
                                        let l_id =character.id;
                                        let l_name =character.name;
                                        let l_number =character.id;
                                        let l_types=[];
                                        let l_stats = [];
                                        let l_sprite = character.sprites.other.dream_world.front_default;
                                        let l_animation = character.sprites.versions["generation-v"]['black-white'].animated.front_default
                                        // let l_sprite = character.sprites.versions["generation-v"]['black-white'].front_default;
                                        let j = 0;
                                        for(j=0;j<character.types.length;j++){
                                            l_types.push({name:character.types[j].type.name})
                                        }
                                        let k = 0;
                                        for(k=0;k<character.stats.length;k++){
                                            l_stats.push({name:character.stats[k].stat.name,base:character.stats[k].base_stat})
                                        }
                                        // console.log(character);
                                        // console.log(l_stats);
                                         pokemon = {
                                            id:     l_id,
                                            name:   l_name,
                                            number: l_number,
                                            types:  l_types,
                                            sprite: l_sprite,
                                            animation:l_animation,
                                            img:    l_sprite,
                                            stats:  l_stats
                                        }
                                        // pokemons.push(pokemon)
                                        // console.log(pokemon)
                                })
                                .catch(function(error){
                                console.log("ERRO:"+error);
                            });
        this.pokemon = pokemon
        // console.log(this.pokemon)
        }  ,
        


    },
    computed:{
        
    },
    created:function(){
        // this.loadChar();
        // console.log("NEXT:"+this.$store.state.next)
    },
    mounted:function(){
        this.loadChar();
        // console.log("NEXT:"+this.$store.state.next)
        window.scrollTo({top: 0, behavior: 'smooth'})
        
    },
    updated:function(){
        // this.loadChar()
        // this.change()
        this.id = this.$route.params.id;
    },
    watch: {
        $route() {
          // react to route changes...

          this.loadChar()
        }
    }

    
}

</script>

<style scoped>
.container{
    margin-top:40px;
    min-height:100vh
}
 .caracter{
        padding:5px;
        width:100%;
        margin-bottom:20px;
        
    }
    .caracter  .pic{  
        /* background-color: rgba(255, 255, 255, 0.22); */
        background-color:transparent;
        border-radius:7px;
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:35vh;
    }
    .caracter  .pic img{
        width:70%;
        /* margin:auto; */
        max-height: 35vh;;
    }

    .caracter .info{
        margin-top:10px;
    }
    .caracter .info .identification{
        display:flex;
        justify-content:center;
        align-items:flex-end;
        
    }
    .caracter .info .identification .name{
        margin-left:10px;
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

    .stats{
        width:100%;
        border:1px solid gray;
        border-radius:4px;
        padding:10px;
        color:white;
    }
    .stats h2{
        margin-bottom:20px;
        font-weight:800;
        text-align:center;
    }
    .stats div{

    }
    .stats div h3{
        margin-bottom:10px;
        font-weight:normal;
        text-transform: uppercase;
    }
    .stats div h3 span{
        font-weight:700;
    }

    .arrow{
        position:fixed;
        top:50%;
    }
    .arrow a{
        color:#ffffff;
        font-size:1.5em;
        padding:5px 10px;
        
    }
    .arrow-left{
        left:0;
        margin-left:3%;
    }
    .arrow-right{
        right:0;
        margin-right:3%;
    }
    .arrow a:hover{
        opacity: 0.5;
        transition:0.2s opacity;
    }
  @media(min-width:425px){
       
     }
@media(min-width:768px){
    
    .stats{
        width:80%;
        margin:auto;
        margin-bottom:50px;
    }
    .caracter  .pic img{
        width:80%;
        /* margin:auto; */
    }
    .container{
    margin-top:80px;
    }
    .caracter .info .identification .name{
        font-size:1.5em;
    }
    .caracter .info .identification .number{
        font-size:1.5em;
    }

}
@media(min-width:1024px){
    
    .container{
        display:flex;
        justify-content:center;
        align-items:center;
        margin-top:0px;
    }
    .caracter{
        width:35%;
        /* background-color:red; */
        margin-bottom:0px;
        margin-right:20px;
    }
    .stats{
        margin:0;
        width:35%;
        margin-bottom:0px;
        /* background-color:rebeccapurple; */
    }
    

}



</style>