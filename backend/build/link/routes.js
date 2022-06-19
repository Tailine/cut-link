"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const linkFactory_1 = require("../factories/linkFactory");
const router = (0, express_1.Router)();
const linkController = (0, linkFactory_1.createLinkController)();
router.post('/', linkController.handleNewShortUrl);
router.get('/:hash', linkController.handleRedirect);
exports.default = router;
