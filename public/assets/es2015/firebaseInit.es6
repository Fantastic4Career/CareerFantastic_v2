import { config } from './config/firebase_config.es6';
import * as firebase from 'firebase';

firebase.initializeApp(config);
let database = firebase.database();

export let jobsAppliedDB = database.ref("/appliedJobs");
export let keywordsTagDB = database.ref("/keywords");
