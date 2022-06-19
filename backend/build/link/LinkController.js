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
exports.LinkController = void 0;
const validateUrl_1 = require("../utils/validateUrl");
class LinkController {
    constructor(service) {
        this.service = service;
        this.handleNewShortUrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { url } = req.body;
            if (!(0, validateUrl_1.validateUrl)(url)) {
                return res
                    .status(400)
                    .json({ error: 'Please provide a valid url. It must be an https url' });
            }
            try {
                const { error, hash } = yield this.service.shortenLink(url);
                if (error) {
                    return res.status(500).json({ error });
                }
                return res.status(200).json({ hash });
            }
            catch (err) {
                return res.status(500).json({ error: err });
            }
        });
        this.handleRedirect = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { hash } = req.params;
                if (hash) {
                    const originalUrl = yield this.service.getLink(hash);
                    if (originalUrl) {
                        return res.redirect(301, originalUrl);
                    }
                }
                return res.status(200).json({ message: 'It worked' });
            }
            catch (err) {
                return res.status(404).json({ message: 'Invalid link' });
            }
        });
    }
}
exports.LinkController = LinkController;
