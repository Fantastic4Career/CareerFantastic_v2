import * as _ from 'lodash';
import * as $ from 'jquery';
import { keywordsTagDB } from './firebaseInit.es6';
import Vue from '../../../node_modules/vue/dist/vue.js';
import VueFire from 'vuefire';
import { searchedJobsVue } from './searchedJobs.es6';

//import VueGoogleMaps from '../../../node_modules/vue2-google-maps/dist/vue-google-maps.js';
// neither is this
//import VueGoogleMaps from 'vue2-google-maps';
// neither is this
//const VueGoogleMaps = require('vue2-google-maps');

Vue.use(VueFire);

export let searchBarVue = new Vue({
  el :  '#search-form' ,
  data: {
    newTag: null,
    selectedTags: [],
  },
  firebase: {
    tags: keywordsTagDB.limitToLast(25)
  },
  methods: {
    removeTags: function(tag) {
      const dbIndex = tag[".key"];
      keywordsTagDB.child(dbIndex).remove();
    },
    addTag: function() {
      if (this.newTag && this.newTag.length >0) {
        const lastIndex = this.tags.length -1;
        const lastElement = this.tags[lastIndex];
        let index = _.get(lastElement,".key", null);
        if (index !== null){
          index = parseInt(index) +1;
        } else {
          index =0;
        }
        keywordsTagDB.child(index).set({name: this.newTag, selected: false});
      }
      this.newTag = null;
    },
    toggleTag: function(tag) {
      tag.selected = !tag.selected;
      keywordsTagDB.child(tag[".key"]).update(_.omit(tag,".key"));
    },
    searchJobs: function() {
      console.log("searching jobs ....");
      const selectedSkills = _.reduce(this.tags, (result, tag)=>{
        if (tag.selected){
          result.push(tag.name);
        }
        return result;
      }, []);
      
      console.log("selectedSkills>>>>", selectedSkills);
      $.ajax({
        method: 'POST',
        url : '/api/searchjob',
        dataType: 'json',
        data: {
          companyName: selectedSkills
        },
      })
      .done(response=>{
        console.log("get response from backend>>>", response);
        searchedJobsVue.updateData(_.cloneDeep(response));
      })
      .fail(error=>{
        console.log("error getting response from backend");
      });
    },
  },
});
