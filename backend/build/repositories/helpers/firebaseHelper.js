"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseClient = void 0;
const firestore_1 = require("firebase/firestore");
const dbConnection_1 = require("../../dbConnection");
exports.FirebaseClient = {
    createShortLink: (linkData) => __awaiter(void 0, void 0, void 0, function* () {
        const linksRef = (0, firestore_1.collection)(dbConnection_1.dbInstance, 'links');
        const q = (0, firestore_1.query)((0, firestore_1.collection)(dbConnection_1.dbInstance, 'links'), (0, firestore_1.where)('original_url', '==', linkData.originalUrl));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        if (!querySnapshot.empty) {
            const a = querySnapshot.docs[0].data().hash;
            return a;
        }
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)(linksRef, linkData.hash), {
            original_url: linkData.originalUrl,
            hash: linkData.hash
        });
        return linkData.hash;
    }),
    getDocumentData: (hash) => __awaiter(void 0, void 0, void 0, function* () {
        const linkDocRef = (0, firestore_1.doc)(dbConnection_1.dbInstance, 'links', hash);
        const docSnap = yield (0, firestore_1.getDoc)(linkDocRef);
        if (!docSnap.exists()) {
            return null;
        }
        return docSnap.data();
    })
};
