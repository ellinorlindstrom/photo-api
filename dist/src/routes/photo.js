"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const photo_controller_1 = require("../controllers/photo_controller");
const validate_request_1 = __importDefault(require("../middlewares/validate_request"));
const photo_rules_1 = require("../validations/photo_rules");
const router = express_1.default.Router();
/**
 * GET /photos
 *
 * Get all photos
 */
router.get('/', photo_controller_1.index);
/**
 * GET /photos/:photoId
 *
 * Get a single photo
 */
router.get('/:photoId', photo_controller_1.show);
/**
 * POST /photos
 *
 * Create a new photo
 */
router.post('/', photo_rules_1.createPhotoRules, validate_request_1.default, photo_controller_1.store);
/**
 * PATCH /photos/:photoId
 *
 * Update a photo
 */
router.patch('/:photoId', photo_rules_1.updatePhotoRules, validate_request_1.default, photo_controller_1.update);
/**
 * DELETE /photos/:photoId
 *
 * Delete a photo
 */
router.delete('/:photoId', photo_controller_1.destroy);
exports.default = router;
