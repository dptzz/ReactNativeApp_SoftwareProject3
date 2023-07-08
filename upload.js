const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKeys.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const auth = admin.auth()
const db = admin.firestore();
const data = require('./usersdata.json');

async function uploadData() {
    const users = [{}]
    data.forEach(user => {
        users.push([{email: user.email, password: user.password}])
    });
    
    for (const doc of data ){
        //await db.collection('users').add(doc);
        auth.importUsers(users)
    }

}

uploadData();