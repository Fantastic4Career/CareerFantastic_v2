let newJobsVue = new Vue({
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
      this.jobs.splice(this.jobs.indexOf(job), 1);
      let lastIndex = this.jobApplied.length -1;
      let lastElement = this.jobApplied[lastIndex];
      let index = _.get(lastElement,".key", null);
      if (index !== null){
        index = parseInt(index) +1;
      } else {
        index =0;
      }
      jobsAppliedDB.child(index).set(job);
      let glassdoorQueryURL = ("http://api.glassdoor.com/api/api.htm?t.p=133031&t.k=Fihlm10MyE&userip=0.0.0.0&useragent=&format=json&v=1&action=employers");
      
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
        let companyInfos = _.get(response, "response.employers", [])
        jobsAppliedDB.child(index).child("glassdoor").set(companyInfos);
      })
      
    }
  }
});
