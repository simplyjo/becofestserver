const router = require("express").Router();
const fetch = require('node-fetch');
// const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
// const CLIENT_HOME_PAGE_URL = "https://mini-app-sol-3b4dbf04ff49.herokuapp.com";
const CLIENT_HOME_PAGE_URL = "https://solmeme.xyz";
const crypto = require('crypto'); // Cryptographic library
const Oauth = require('oauth-1.0a'); // OAuth 1.0a library
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';
const params = 'user.fields=created_at,description&expansions=pinned_tweet_id' // Edit optional query parameters here
const axios = require('axios')

const endpointURL = `https://api.twitter.com/2/users/me?${params}`;

const oauth = Oauth({
  consumer: {
    key: process.env.CONSUMER_KEY,
    secret: process.env.CONSUMER_SECRET
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

// add your client id and secret here:
const TWITTER_OAUTH_CLIENT_ID = "bDdhLWgyaFRraFpwM0QxaXNIWW06MTpjaQ";
const TWITTER_OAUTH_CLIENT_SECRET = process.env.CLIENT_SECRET;

// the url where we get the twitter access token from
const TWITTER_OAUTH_TOKEN_URL = "https://api.twitter.com/2/oauth2/token";

// we need to encrypt our twitter client id and secret here in base 64 (stated in twitter documentation)
const BasicAuthToken = Buffer.from(`${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`, "utf8").toString(
  "base64"
);




// filling up the query parameters needed to request for getting the token
 const twitterOauthTokenParams = {
  client_id: TWITTER_OAUTH_CLIENT_ID,
  code_verifier: "y_SftyBmOES02u56etheIkIgLQAlTBggyf_G7uKT51ku8",
  redirect_uri: `http://localhost:3000/callback`,
  grant_type: "authorization_code",
};

// the main step 1 function, getting the access token from twitter using the code that the twitter sent us
 async function getTwitterOAuthToken(code) {
  try {


    console.log("res", code)

    const res = await axios.post(

      TWITTER_OAUTH_TOKEN_URL,
      new URLSearchParams({ ...twitterOauthTokenParams, code }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${BasicAuthToken}`,
        },
      }
    );

    // console.log("res", res)

    return res.data;
  } catch (err) {
    return null;
  }
}

// getting the twitter user from access token
 async function getTwitterUser(accessToken){
  try {
    // request GET https://api.twitter.com/2/users/me

    console.log("getTwitterUser", accessToken)
    const res = await axios.get("https://api.twitter.com/2/users/me", {
      headers: {
        "Content-type": "application/json",
        "User-Agent": "v2UserLookupJS",
        // put the access token in the Authorization Bearer token
        "authorization": `Bearer ${accessToken}`,
      },
    });
console.log("resuser",res)





    return res.data.data ?? null;
  } catch (err) {
    return null;
  }
}


async function getRequest({
  oauth_token,
  oauth_token_secret}
) {

  try {

  
  const token = {
    key: oauth_token,
    secret: oauth_token_secret
  };

  const authHeader = oauth.toHeader(oauth.authorize({
    url: endpointURL,
    method: 'GET'
  }, token));

  const req = await fetch(endpointURL, {
    headers: {
      Authorization: authHeader["Authorization"],
      'user-agent': "v2UserLookupJS"
    }
  });

  console.log("req", req)

  const body = await req.text();
      return Object.fromEntries(new URLSearchParams(body));
}
catch (error) {
  console.error('Error:', error)
  throw error;
}}

router.post("/", async (req, res) => {
  try {
    console.log("start here 2 twitter link")

    const {code} = req.body;

    console.log("codetwitter", code)

    // 1. get the access token with the code
    const twitterOAuthToken = await getTwitterOAuthToken(code);
    console.log("twitterOAuthToken", twitterOAuthToken)
  
   
    // twitterOAuthToken {
    //   token_type: 'bearer',
    //   expires_in: 7200,
    //   access_token: 'TERTZHhaTGkxM2ltSHRkUFlOUk5teFdaWC1YcHVGcUJrVlg5RzJsOVBVMFhlOjE3MDY4NzYyNzE3MTE6MToxOmF0OjE',
    //   scope: 'follows.read offline.access users.read tweet.read follows.write',
    //   refresh_token: 'ZmswLWNrZ0pfVE12TzVaWTlxakRFZkRmQ3dtUFpub2lXMjFNTk1NbUN1RER2OjE3MDY4NzYyNzE3MTE6MToxOnJ0OjE'
    // }
  
    // twitterOAuthToken {
    //   token_type: 'bearer',
    //   expires_in: 7200,
    //   access_token: 'WHVfRm1UQ1FWdk5od3Vrc2I0X3BFUnVueklWSnZBX2lEaUw0eHF3by1YbWZaOjE3MDY4NzY0NDg2NzY6MTowOmF0OjE',
    //   scope: 'follows.read offline.access users.read tweet.read follows.write',
    //   refresh_token: 'ai1aUnZYQk9sOEZCR2NoemdmWU15NE9iWjN4SFhqVHBhb3ZZVFpYSWR6X2xmOjE3MDY4NzY0NDg2NzY6MTowOnJ0OjE'
    // }
    
    // 3. upsert the user in our db
    // const user = await upsertUser(twitterUser);
  
    // 4. create cookie so that the server can validate the user
    // addCookieToRes(res, user, twitterOAuthToken.access_token);
  
    // 5. finally redirect to the client
    return res.redirect(process.env.CLIENT_URL);

  } catch (error) {
    console.log('Error: ', error);
  }
})





module.exports = router;
