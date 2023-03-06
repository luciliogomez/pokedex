<template>
    <main class="container">
        <div class="caracters">

            <pokemon-character v-for="pokemon in pokemons" :pokemon="pokemon" :key="pokemon.id" />
            
        </div>
        <div class="load">
            <span @click="loadMore" class="more">
                Load more
            </span>
        </div>

    </main>
</template>

<script>
import PokemonCharacter from '@/components/PokemonCharacter.vue';
import api from "../services/api.js"
export default {
    name:"SiteHome",
    data:function(){
        return {
            pokemons: [
                
                
            ],
            link: 'starting',
            offsetSearch:0,
            limitSearch:200
        }
    },
    methods:{
        getDefaultImg() {
            return require("../assets/pokemon/poke-shadow.png");
        },
        // Load POkemons
         loadPokemons: function(rota){
			this.$store.commit('eraseSearchText');
			this.clearPokemonList()
                // console.log("LISTA STORE: "+this.$store.state.pokemons);
                // console.log(this.$store.state.count)
                let pokemons = this.pokemons;
                let next = '';
                // console.log("LINK START: "+this.link);
                // console.log("NEXT VAR START: "+next);
                     api.get(rota).
                    then( (response) => {
                        let results = response.data.results;
                        // console.log("NEXT LINK: "+response.data.next)
                        next = response.data.next;
                        // console.log("LINK inside START: "+this.link);
                        this.link = next;
                        // console.log("LINK inside CHANGED: "+this.link);  
                        this.$store.commit('setLink',this.link);
                        // console.log("NEXT VAR INSIDE: "+next);
                        let i = 0;
                        
                        for(i =0 ;i<results.length;i++){
                        
                            // console.log("Character: "+results[i].name)
                             api.get(results[i].url).
                                then((response)=>{
                                        let character = response.data;
                                        let l_id =character.id;
                                        let l_name =character.name;
                                        let l_number =character.id;
                                        let l_types=[];
                                        let l_sprite = character.sprites.other.dream_world.front_default;
                                        let l_animation = character.sprites.versions["generation-v"]['black-white'].animated.front_default
                                        // let l_sprite = character.sprites.versions["generation-v"]['black-white'].front_default;
                                        let j = 0;
                                        for(j=0;j<character.types.length;j++){
                                            l_types.push({name:character.types[j].type.name})
                                        }

                                        let pokemon = {
                                            id:     l_id,
                                            name:   l_name,
                                            number: l_number,
                                            types:  l_types,
                                            sprite: l_sprite,
                                            animation:l_animation,
                                            img:l_sprite
                                        }
                                        // pokemons.push(pokemon)
                                        this.pokemons.push(pokemon)
                                        

                                })
                                .catch(function(error){
                                console.log(error);
                            });
                        }
                        // console.log(response.data);
                        // console.log(results);

                    })
                    .catch(function(error){
                      console.log(error);
                    });


        // this.pokemons = pokemons;
        // console.log("NEXT VAR: "+next);
        
        this.$store.commit('fill',pokemons);
        
        // console.log("NEXT STORE: "+this.$store.state.next);
        this.$store.commit('setNext',"KK");

        // console.log(this.pokemons);
        // console.log("NEXT END: "+this.$store.state.next);
        
        // console.log("LINK END: "+this.link);
        // this.$store.commit('setLink',this.link);
        },
        loadMore: function(){
            if(this.$store.state.searchText != ""){
                // console.log(this.$store.state.searchText);
                this.loadMoreSearchPokemon(this.$store.state.searchText)
            }else{
                let rota = this.$store.state.link;
                let pokemons = this.pokemons;
                     api.get(rota).
                    then( (response) => {
                        let results = response.data.results;
                        let next = response.data.next;
                        this.link = next; 
                        this.$store.commit('setLink',this.link);  
                        let i = 0;
                        for(i =0 ;i<results.length;i++){
                        
                             api.get(results[i].url).
                                then((response)=>{
                                        let character = response.data;
                                        let l_id =character.id;
                                        let l_name =character.name;
                                        let l_number =character.id;
                                        let l_types=[];
                                        let l_sprite = character.sprites.other.dream_world.front_default;
                                        // let l_sprite = character.sprites.other["official-artwork"].front_default;                                        
                                        let l_animation = character.sprites.versions["generation-v"]['black-white'].animated.front_default
                                        let j = 0;
                                        for(j=0;j<character.types.length;j++){
                                            l_types.push({name:character.types[j].type.name})
                                        }

                                        let pokemon = {
                                            id:     l_id,
                                            name:   l_name,
                                            number: l_number,
                                            types:  l_types,
                                            sprite: l_sprite,
                                            animation:l_animation,
                                            img:l_sprite
                                        }
                                        this.pokemons.push(pokemon)
                                        

                                })
                                .catch(function(error){
                                console.log(error);
                            });
                        }
                        // console.log(response.data);
                        // console.log(results);

                    })
                    .catch(function(error){
                      console.log(error);
                    });


        // this.pokemons = pokemons;
        
        this.$store.commit('fill',pokemons);
        this.$store.commit('setNext',"KK");
            }

        },

        // End LoadMore
    searchPokemon: function(searchText){
                // console.log("----OFFSET:"+this.offsetSearch)
                // console.log("LIMIT:"+this.limitSearch)
                this.offsetSearch = 0;
                this.clearPokemonList()
                // console.log("ACTUAL LIST:"+this.pokemons)
                let pokemons = this.pokemons;
                // let next = '';
                     api.get("/pokemon/?offset="+this.offsetSearch+"&limit="+this.limitSearch).
                    then( (response) => {
                        // console.log("LIMIT:"+this.limitSearch)
                        let results = response.data.results;
                        // next = response.data.next;
                        // this.link = next;
                        // this.$store.commit('setLink',this.link);
                        let i = 0;
                        
                        for(i =0 ;i<results.length;i++){
                        
                             api.get(results[i].url).
                                then((response)=>{
                                        let character = response.data;
                                        // var pathern = new RegExp('^' + character.name, 'i');
                                        // console.log("TESTING: " +character.name)
                                        if( (character.name.startsWith(searchText)) ){
                                                // console.log("FOUND: " +character.name)
                                                // if(character.name.)
                                                let l_id =character.id;
                                                let l_name =character.name;
                                                let l_number =character.id;
                                                let l_types=[];
                                                let l_sprite = character.sprites.other.dream_world.front_default;
                                                let l_animation = character.sprites.versions["generation-v"]['black-white'].animated.front_default
                                                let j = 0;
                                                for(j=0;j<character.types.length;j++){
                                                    l_types.push({name:character.types[j].type.name})
                                                }

                                                let pokemon = {
                                                    id:     l_id,
                                                    name:   l_name,
                                                    number: l_number,
                                                    types:  l_types,
                                                    sprite: l_sprite,
                                                    animation:l_animation,
                                                    img:l_sprite
                                                }
                                                this.pokemons.push(pokemon)
                                        }

                                })
                                .catch(function(error){
                                console.log(error);
                            });
                        }
                        // console.log(response.data);
                    })
                    .catch(function(error){
                      console.log(error);
                    });
        this.$store.commit('fill',pokemons);
        this.$store.commit('setNext',"KK");
        this.offsetSearch += this.limitSearch+1;
    },
    // END SEARCH POKEMON METHOD
    
    loadMoreSearchPokemon: function(searchText){
        // console.log("----OFFSET:"+this.offsetSearch)
        // console.log("ACTUAL LIST:"+this.pokemons)
        // console.log("LIMIT:"+this.limitSearch)        
                
                // this.clearPokemonList()
                // let pokemons = this.pokemons;
                // let next = '';
                     api.get("/pokemon/?offset="+this.offsetSearch+"&limit="+this.limitSearch).
                    then( (response) => {
                        // console.log("LIMIT:"+this.limitSearch)
                        let results = response.data.results;
                        // next = response.data.next;
                        // this.link = next;
                        // this.$store.commit('setLink',this.link);
                        let i = 0;
                        
                        for(i =0 ;i<results.length;i++){
                        
                             api.get(results[i].url).
                                then((response)=>{
                                        let character = response.data;
                                        // var pathern = new RegExp('^' + character.name, 'i');
                                        // console.log("TESTING: " +character.name)
                                        if( (character.name.startsWith(searchText)) ){
                                                // console.log("FOUND: " +character.name)
                                                // if(character.name.)
                                                let l_id =character.id;
                                                let l_name =character.name;
                                                let l_number =character.id;
                                                let l_types=[];
                                                let l_sprite = character.sprites.other.dream_world.front_default;
                                                let l_animation = character.sprites.versions["generation-v"]['black-white'].animated.front_default
                                                let j = 0;
                                                for(j=0;j<character.types.length;j++){
                                                    l_types.push({name:character.types[j].type.name})
                                                }

                                                let pokemon = {
                                                    id:     l_id,
                                                    name:   l_name,
                                                    number: l_number,
                                                    types:  l_types,
                                                    sprite: l_sprite,
                                                    animation:l_animation,
                                                    img:l_sprite
                                                }
                                                this.pokemons.push(pokemon)
                                        }

                                })
                                .catch(function(error){
                                console.log(error);
                            });
                        }
                        // console.log(response.data);
                    })
                    .catch(function(error){
                      console.log(error);
                    });
        this.$store.commit('fill',this.pokemons);
        this.$store.commit('setNext',"KK");
        this.offsetSearch += this.limitSearch+1;
    },


    clearPokemonList: function(){
        this.pokemons = [];
    },

    clearNextLink: function(){
        this.$store.commit('setLink',"");
    },
    clearSearchParams: function(){
        this.offsetSearch = 0;
        
    },



    },
    
    created: function(){
        this.clearPokemonList()
        this.clearNextLink();
        this.clearSearchParams();
        // if(this.$store.state.link != ''){
        //     this.loadPokemons(this.$store.state.link);
        // }else{
             this.$store.commit('eraseSearchText');
            
            // this.loadPokemons("/pokemon/");
        // }
        
        //  console.log("LINK END END: "+this.$store.state.link);
        // console.log("CREATED CREATED CREATED:")
        // console.log("ACTUAL LIST:"+this.pokemons)
    },
    components:{
        PokemonCharacter
    }
    ,
    mounted:function(){
		this.$store.commit('eraseSearchText');
        this.clearPokemonList()
        this.clearNextLink();
        this.clearSearchParams();
        // console.log("MOUNTED  MOUNTED MOUNTED")
        // console.log("ACTUAL LIST:"+this.pokemons)
        // if(this.$store.state.link != ''){
        //     this.loadPokemons(this.$store.state.link);
        // }else{
            this.loadPokemons("/pokemon/");
            // console.log("ACTUAL LIST:"+this.pokemons)
        // }

        
    },
    watch:{
        '$store.state.searchText':function(){
            // store.state.searchText;
            if(this.$store.state.searchText ==""){
                console.log("EMPTY SEARCH TEXT");    
            }else{
                this.searchPokemon(this.$store.state.searchText);
            }
            
        },

        $route() {
          // react to route changes...

          this.loadPokemons("/pokemon/")
        }
    }
  
}

</script>

<style scoped>
    main{
        min-height:calc(100vh - 50px);
    }

    .caracters{
        width:100%;
        margin:auto;
        display:flex;
        flex-direction:column;
        justify-content: center;
        margin-top:50px;
    }

    .load{
        width:50%;
        margin:auto;
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .more{
        color: white;
        font-size:1.3em;
        padding:5px 10px;
        border-radius:3px;
        background-color: rgb(3, 134, 32);
        margin-bottom: 50px;
        cursor: pointer;
    }

@media(min-width:768px){
     .caracters{
        width:100%;
        flex-direction:row;
        justify-content: space-between;
        align-items:flex-start;
        margin-top:50px;
        flex-wrap: wrap;
    }


}
@media(min-width:1024px){
     .caracters{
        width:100%;
        flex-direction:row;
        justify-content: center;
        align-items:flex-start;
        margin-top:50px;
        flex-wrap: wrap;
    }


}

@media(min-width:1440px){
     .caracters{
        width:90%;
        flex-direction:row;
        justify-content: center;
        align-items:flex-start;
        margin-top:50px;
        flex-wrap: wrap;
    }   

}

@media(min-width:2000px){

}
</style>
