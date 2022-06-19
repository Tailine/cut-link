"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinkController = void 0;
const FirebaseLinkRepository_1 = require("../link/FirebaseLinkRepository");
const LinkController_1 = require("../link/LinkController");
const LinkService_1 = require("../link/LinkService");
function createLinkController() {
    const linkRepository = new FirebaseLinkRepository_1.FirebaseLinkRepository();
    const linkService = new LinkService_1.LinkService(linkRepository);
    return new LinkController_1.LinkController(linkService);
}
exports.createLinkController = createLinkController;
