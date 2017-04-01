let $selectSkills = $("#select-skills");
let $addSkillsButton = $("#add-skill-button");
let $searchButton = $("#search");
let $jobTitleInput = $("#job-title");
let $locationInput = $("#location");
let selectedSkills = [];
let results =[];
let markers = [];

let searchBarVue = new Vue({
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
      })
      /*
      let title = $jobTitleInput.val().trim();
      let location = $locationInput.val().trim();
      //$(".tag-cloud a").attr({"class":""});
      skills = [];
      // make a call to indeed/dice api here
      let jobQuery = selectedSkills.concat(title);
      let skillsString = selectedSkills.join(" ");
      jobQuery = jobQuery.join(" ");
      selectedSkills= [];
      // make a call to indeed/dice api here
      //TODO: Indeed(q:jobQuery, l: location);
      let indeedAjax = 
      $.ajax({
        method: 'GET',
        url: 'https://api.indeed.com/ads/apisearch',
        crossDomain: true,
        dataType: 'jsonp',
        data: {
          'v': '2', 
          'format': 'json', 
          'publisher': "9049151526441005",
          q: jobQuery,
          l: location,
          userip: 'localhost',
          useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
          latlong: '1'
        }
      });// end ajax

      let queryURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json";
      let diceAjax = 
      $.ajax({
       url: queryURL,
       method: "GET",
       data: {
        direct: 1,
        //skill: skillsString,
        text: title,
        city: location,
        page: 1,
        pgcnt: 10,
        sort: 1,
        sd: 'd',
       }
      });
      
      Promise.all([Promise.resolve(indeedAjax), Promise.resolve(diceAjax)])
      .spread(function(indeedResponse, diceResponse){
        let indeedResults = _.get(indeedResponse,'results',[]);
        indeedResults = _.map(indeedResults, function(d){
          d.source_api = "Indeed";
          d.company = d.company;
          d.job_title= d.jobtitle;
          d.location = d.city + " " +d.state;
          d.skills = parseJobSkills(d.snippet);
          d.date_posted= moment(d.date).format("YYYY-MM-DD");
          return d;
        })
        
        let diceResults = _.get(diceResponse, 'resultItemList',[]);
        diceResults = _.map(diceResults, function(d){
          d.source_api = "Dice";
          d.company = d.company;
          d.job_title= d.jobTitle;
          d.location = d.location;
          d.skills = null;
          d.date_posted= moment(d.date).format("YYYY-MM-DD");
          return d;
        })
        results = indeedResults.concat(diceResults);
      });
      */
    },
  },
});
