# 1
create folder "environment" in the same level as "nodemodules" folder.

# 2
create "auth.js" inside "environment" folder you just created.

# 3
declare your Jira authentication data as shown:
<pre><code>
const authData = {
    email: "your-email",
    api_token: "your-api-token"
  }

module.exports = authData;

</code></pre>

# 4
Install dependencies with "yarn" within both root (/) and /backend directories

# 5
Start client service from root directory with "yarn start"

# 6
Start server from /backend directory with "yarn start"