import * as _ from 'lodash';
import * as $ from 'jquery';
import { jobsAppliedDB } from './firebaseInit.es6';
import Vue from '../../../node_modules/vue/dist/vue.js';
import VueFire from 'vuefire';

export let appliedJobsVue = new Vue({
  el :  '#selected-results' ,
  firebase: {
    jobs: jobsAppliedDB.limitToLast(25)
  },
  methods: {
    removeJob: function (job) {
      // remove current job
      const index = this.jobs.indexOf(job);
      const dbIndex = job[".key"];
      //this.jobs.splice(index, 1);

      jobsAppliedDB.child(dbIndex).remove();
      //
      // put it into jobApplied array
    }, 
    updateJob: function (job) {
      console.log("job is >>>>", job);
      const dbIndex = job[".key"];
      console.log("dbIndex is>>>", dbIndex);
      jobsAppliedDB.child(dbIndex).update(_.omit(job, ".key"));
    }, 
  },
})
