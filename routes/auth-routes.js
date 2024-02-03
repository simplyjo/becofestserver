const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    console.log("start here")
    const TWITTER_CLIENT_ID = "bDdhLWgyaFRraFpwM0QxaXNIWW06MTpjaQ" // give your twitter client id here
      const rootUrl = "https://twitter.com/i/oauth2/authorize";
      const options = {
        redirect_uri: "http://localhost:3000/callback", // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
        client_id: TWITTER_CLIENT_ID,
        state: "state",
        response_type: "code",
        code_challenge: "y_SftyBmOES02u56etheIkIgLQAlTBggyf_G7uKT51ku8",
        code_challenge_method: "plain",
        scope: ["users.read", "tweet.read","offline.access", "follows.read", "follows.write"].join(" "), // add/remove scopes as needed
      };
      const qs = new URLSearchParams(options).toString();
    res.send({
      success: true,
      message: "User logged in successfully",
      path: `${rootUrl}?${qs}`,

    });

  } catch (error) {
    console.log('Error: ', error);
  }
})




module.exports = router;
