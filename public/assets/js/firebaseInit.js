firebase.initializeApp(config);
let database = firebase.database();
let jobsAppliedDB = database.ref("/appliedJobs");
let keywordsTagDB = database.ref("/keywords");
