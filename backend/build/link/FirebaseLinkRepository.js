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
exports.FirebaseLinkRepository = void 0;
const firebaseHelper_1 = require("../repositories/helpers/firebaseHelper");
class FirebaseLinkRepository {
    create(linkData) {
        return __awaiter(this, void 0, void 0, function* () {
            const docData = yield firebaseHelper_1.FirebaseClient.getDocumentData(linkData.hash);
            if (docData) {
                return { error: 'No duplicated links allowed' };
            }
            const uniqueHash = yield firebaseHelper_1.FirebaseClient.createShortLink(linkData);
            return { hash: uniqueHash };
        });
    }
    get(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const docData = yield firebaseHelper_1.FirebaseClient.getDocumentData(hash);
            if (!docData) {
                return null;
            }
            return docData.original_url;
        });
    }
}
exports.FirebaseLinkRepository = FirebaseLinkRepository;
