


const clientId = 'YOUR_TWITTER_CLIENT_ID';
const clientSecret = 'YOUR_TWITTER_CLIENT_SECRET';
const tokenEndpoint = 'https://api.twitter.com/oauth2/token';


router.get("/twitter", async (req, res) => {
    try {
        const response = await axios.post(tokenEndpoint, null, {
            params: {
                grant_type: 'client_credentials',
            },
            auth: {
                username: clientId,
                password: clientSecret,
            },
        });

        const { access_token } = response.data;
        setAccessToken(access_token);
    } catch (error) {
        console.error('Error authenticating with Twitter API:', error);
    }
});

