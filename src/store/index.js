import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons:[
      {
        id:"e",
        nome:"email"
      },
      {
        id:"e",
        nome:"email"
      }
    ],
    
    next: 'mmmm',
    
    link: '',

    searchText: ''

  },

  getters: {
  },

  mutations: {
    adicionar(state,pokemon){
      state.pokemons.push(pokemon);
    },

    fill(state,pokemon){
      state.pokemons = pokemon;
    },

    setNext(state,nex){
      state.next = nex;
    },
    setLink(state,l){
      state.link = l;
    },
    setSearchText(state,text){
     state.searchText = text; 
    }
    ,
    eraseSearchText(state){
		// console.log("BEFORE ERASE: "+state.searchText);
		state.searchText = ""
		// console.log("AFTER ERASE: "+state.searchText);
    }
  },
  actions: {
  },
  modules: {
  }
})
