import * as _ from 'lodash';
import * as $ from 'jquery';
import { jobsAppliedDB } from './firebaseInit.es6';
import Vue from '../../../node_modules/vue/dist/vue.js';
import VueFire from 'vuefire';

export let searchedJobsVue = new Vue({
  el: '#search-results',
  data: {
    jobs: []
  },
  firebase: {
    jobApplied: jobsAppliedDB.limitToLast(25)
  },
  methods: {
    updateData: function (data) {
      this.jobs = data;
    }, 
    removeJob: function (job) {
      // remove current job
      console.log("here>>>>", this.jobApplied);
      this.jobs.splice(this.jobs.indexOf(job), 1);
      const lastIndex = this.jobApplied ? this.jobApplied.length -1 : 0;
      const lastElement = this.jobApplied ? this.jobApplied[lastIndex] :null;
      console.log("lastElement is>>>", lastElement);
      let index = _.get(lastElement,".key", null);
      if (index !== null){
        index = parseInt(index) +1;
      } else {
        index =0;
      }
      jobsAppliedDB.child(index).set(job);
      console.log("here>>>>", this.jobApplied);
      const glassdoorQueryURL = ("http://api.glassdoor.com/api/api.htm?t.p=133031&t.k=Fihlm10MyE&userip=0.0.0.0&useragent=&format=json&v=1&action=employers");
      
      $.ajax({
       url: glassdoorQueryURL,
       method: "GET",
       CrossDomain: true,
       dataType: 'jsonp',
       data: {
        q: job.company
       }
      })
      .done(function(response){
        const companyInfos = _.get(response, "response.employers", [])
        jobsAppliedDB.child(index).child("glassdoor").set(companyInfos);
      })
    }
  }
});
