/**
 * Main application routes
 */
import express from "express";
import albumRoutes from "./album";
import photoRoutes from "./photo";
import profileRoutes from "./profile";
import { login, refresh, register } from "../controllers/user_controller";
import { validateAccessToken } from "../middlewares/auth/jwt";
import validateRequest from "../middlewares/validate_request";
import { createUserRules } from "../validations/user_rules";
import { loginRules } from "../validations/auth_rules";
const router = express.Router();

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
router.use('/albums', validateAccessToken, albumRoutes);

/**
 * /photos
 */
router.use('/photos', validateAccessToken, photoRoutes);

/**
 * POST /login
 *
 * Log in a user
 */
router.post('/login', loginRules, validateRequest, login);

/**
 * POST /refresh
 *
 * Refresh the access token
 */
router.post('/refresh', refresh);

/**
 * POST /register
 *
 * Register a new user
 */
router.post('/register', createUserRules, validateRequest, register);

/**
 * /profile
 */
router.use('/profile', validateAccessToken, profileRoutes);


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




export default router;
