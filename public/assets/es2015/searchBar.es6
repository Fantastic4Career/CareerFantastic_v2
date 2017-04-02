import * as _ from 'lodash';
import * as $ from 'jquery';
import { keywordsTagDB } from './firebaseInit.es6';
import Vue from '../../../node_modules/vue/dist/vue.js';
import VueFire from 'vuefire';

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
      let dbIndex = tag[".key"];
      keywordsTagDB.child(dbIndex).remove();
    },
    addTag: function() {
      if (this.newTag && this.newTag.length >0) {
        let lastIndex = this.tags.length -1;
        let lastElement = this.tags[lastIndex];
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
      let selectedSkills = _.reduce(this.tags, (result, tag)=>{
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
      })
      .fail(error=>{
        console.log("error getting response from backend");
      });
    },
  },
});
