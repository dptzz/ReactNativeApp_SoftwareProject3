const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKeys.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
let darray = ['a','1','c','d','3','f','5','h','i']
const data = {
    array: darray,
}
    
async function uploadData() {
    await db.collection('test').add(data);
}


uploadData();