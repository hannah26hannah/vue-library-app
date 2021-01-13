    
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");

admin.initializeApp();
const db = admin.firestore();

const algoliaClient = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);

const collectionIndexName = "reviews";
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

exports.sendCollectionToAlgolia = functions.https.onRequest(async (req, res) => {
    const algoliaRecords = [];
    const bookRecordRef = db.collection("bookRecord");
    const querySnapshot = await bookRecordRef.doc({userUID}).collection("bookInfo").get();

    querySnapshot.docs.forEach(doc => {
        const document = doc.data();

        const record = {
            objectId: doc.id,
            created: document.created,
            genre: document.genre,
            quote: document.quote,
            review: document.review,
            title: document.title,
            writer: document.writer
        };

        algoliaRecords.push(record);
    });

    collectionIndex.saveObjects(algoliaRecords, (_error, content) => {
        res.status(200).send("bookInfo Collection was indexed to Algolria successfully");
    })
})