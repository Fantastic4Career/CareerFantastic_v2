let appliedJobsVue = new Vue({
  el :  '#selected-results' ,
  firebase: {
    jobs: jobsAppliedDB.limitToLast(25)
  },
  methods: {
    removeJob: function (job) {
      // remove current job
      var dbIndex = job[".key"];
      jobsAppliedDB.child(dbIndex).remove();
    }, 
    updateJob: function (job) {
      var dbIndex = job[".key"];
      jobsAppliedDB.child(dbIndex).update(_.omit(job, ".key"));
    }, 
  },
});
