"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main application routes
 */
const express_1 = __importDefault(require("express"));
const album_1 = __importDefault(require("./album"));
const photo_1 = __importDefault(require("./photo"));
const profile_1 = __importDefault(require("./profile"));
const user_controller_1 = require("../controllers/user_controller");
const jwt_1 = require("../middlewares/auth/jwt");
const validate_request_1 = __importDefault(require("../middlewares/validate_request"));
const user_rules_1 = require("../validations/user_rules");
const auth_rules_1 = require("../validations/auth_rules");
const router = express_1.default.Router();
/**
 * GET /
 */
router.get("/", (req, res) => {
    res.send({
        message: "Time for a pawsome break! 🐾 https://www.youtube.com/watch?v=GdVPn0mQp2k&ab_channel=jimmysomethingdoodles https://www.youtube.com/watch?v=AoRgRYwSmRc&ab_channel=jimmysomethingdoodles",
    });
});
/**
 *  /albums
 */
router.use('/albums', jwt_1.validateAccessToken, album_1.default);
/**
 * /photos
 */
router.use('/photos', jwt_1.validateAccessToken, photo_1.default);
/**
 * POST /login
 *
 * Log in a user
 */
router.post('/login', auth_rules_1.loginRules, validate_request_1.default, user_controller_1.login);
/**
 * POST /refresh
 *
 * Refresh the access token
 */
router.post('/refresh', user_controller_1.refresh);
/**
 * POST /register
 *
 * Register a new user
 */
router.post('/register', user_rules_1.createUserRules, validate_request_1.default, user_controller_1.register);
/**
 * /profile
 */
router.use('/profile', jwt_1.validateAccessToken, profile_1.default);
/**
 * Catch-all route handler
 */
router.use((req, res) => {
    // Respond with 404 and a message in JSON-format
    res.status(404).send({
        message: "Not Found",
    });
});
/**
 * Run this function below to see a secret message and a tiny piece of art
 */
function secretMessage() {
    console.log(`
	  If you're reading this, you've found the secret message.
	  Here's a joke for you: Why do programmers prefer dark mode?
	  Because light attracts bugs! 🐛 🤭

	  And here's a tiny piece of art portraying Nando and Melvin to brighten your day:

	   __
	  /  \\
	 / ..|\\
	(_\\  |_|
	/  \\@'
     /     \\
_   /  \`   |
\\\\/ \  .  _\\
\`\\__/\\  \\__/
	\\__\\

	   /\\_/\\
	  ( o.o )
	   > ^ <

	`);
}
//---> console.log(secretMessage());
exports.default = router;
