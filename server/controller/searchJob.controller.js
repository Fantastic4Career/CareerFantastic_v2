const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');
const request = Promise.promisify(require('request'));

module.exports =  () => {
  return Promise.all([
    getIndeedJobs(),
    getDiceJobs(),
  ])
  .spread((indeedResults, diceResults)=>{
    indeedResults = _.map(indeedResults, function(d){
      d.source_api = "Indeed";
      d.company = d.company;
      d.job_title= d.jobtitle;
      d.location = d.city + " " +d.state;
      d.skills = parseJobSkills(d.snippet);
      d.date_posted= moment(d.date).format("YYYY-MM-DD");
      return d;
    });

    diceResults = _.map(diceResults, function(d){
      d.source_api = "Dice";
      d.company = d.company;
      d.job_title= d.jobTitle;
      d.location = d.location;
      d.skills = null;
      d.date_posted= moment(d.date).format("YYYY-MM-DD");
      return d;
    })
    let results = indeedResults.concat(diceResults);
    return results;
  })
};

const getIndeedJobs = () =>{
  return request({
    method: 'GET',
    uri: 'https://api.indeed.com/ads/apisearch',
    qs: {
      'v': '2', 
      'format': 'json', 
      'publisher': "9049151526441005",
      q: "javascript",
      l: "San Francisco, CA",
      userip: 'localhost',
      useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
      latlong: '1'
    }
  })
  .then(response=>{
    return _.get(JSON.parse(response.body), "results", []);
  })
  .catch(error=>{
    console.log("error from indeed is>>>", error);
  });
};

const getDiceJobs = () => {
  return request({
   method: "GET",
   uri: "http://service.dice.com/api/rest/jobsearch/v1/simple.json",
   qs: {
    direct: 1,
    //skill: skillsString,
    text: "Software Engineer",
    city: "San Francisco, CA",
    page: 1,
    pgcnt: 10,
    sort: 1,
    sd: 'd',
   }
  })
  .then(response=>{
    return _.get(JSON.parse(response.body), "resultItemList", []);
  })
  .catch(error=>{
    console.log("error from dice is>>>", error);
  });
};

const normalizedSkills = {
  "Javascript": "Javascript",
  "Ruby": "Ruby",
  "Java": "Java",
  "Software": "Software", 
  "Angular": "Angular",
  "React": "React", 
  "Vue": "Vue",
  "Node": "Node",
  "CSS": "CSS",
  "HTML": "HTML",
  "Bootstrap":  "Bootstrap",
  "MySQL": "MySQL",
  "MongoDB": "MongoDB",
  "Firebase": "Firebase",
  "Sass": "Sass",
  "Python": "Python",
  "Django": "Django",
  "Rail": "Ruby on Rails",
  "Flask": "Flask"
};

const parseJobSkills = skills => {
  let processedSkills = skills.toLowerCase();
  let skillsArray = [];
  _.forEach(normalizedSkills, (value, key)=>{
    let processedKey = key.toLowerCase();
    if (processedSkills.indexOf(processedKey) !== -1) {
      skillsArray.push(value);
    }
  })
  return skillsArray.join(", ");
};
