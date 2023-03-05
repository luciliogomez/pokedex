<template>
  <div id="app">
    <SiteHeader v-on:search="searche"/>
    <router-view/>
  </div>
</template>


<script>
import "./styles/style.css"
import SiteHeader from './components/SiteHeader.vue'



export default {
  data:function(){
    return {

    }
  },

  components:{
    SiteHeader
  },

  methods:{
    searche:function(searchText){
      searchText = searchText.replace(/(\r\n|\n|\r)/gm,"");
      console.log("Searched: -"+searchText+" -");
      this.$store.commit('setSearchText',searchText);
      // this.$router.push({ path: '/search', query: { q: searchText } })
    }
  }

}

</script>


<style scoped>
</style>
