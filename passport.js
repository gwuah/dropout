var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var User = require("./models/User");

passport.use(
  new GitHubStrategy(
    {
      scope: "user,gist",
      clientID: "YOUR_GITHUB_CLIENT_ID",
      clientSecret: "YOUR_GITHUB_CLIENT_SECRET",
      callbackURL: "https://dropout-kilm.herokuapp.com/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      const ourUser = {
        githubId: profile["id"],
        username: profile["username"],
        displayName: profile["displayName"],
        avatar: profile._json["avatar_url"],
        email: profile._json["email"],
        access_token: accessToken
      };

      User.findOrCreate({ githubId: profile.id }, ourUser, function(err, user) {
        console.log("saved sucessfully");
        return cb(err, user);
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  // console.log('serialize', user)
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log(obj);
  cb(null, obj);
});
