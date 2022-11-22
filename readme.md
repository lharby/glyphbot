# A twitter bot designed to connect to a 'text to image' AI.

# prerequisites

-   NVM
-   Node (use > v14.0.0)

# running

Execute `run npm start` in the root folder.

Connect to the DALL-E API and fetch images using pseudo-randomised parameters. Once retrieved push a single image to Mastodon.

There is a fallback should any of the processes fail

API tokens, secrets, authentication etc are stored in .env file, and should not be pushed to the repo.

Refenreces:
https://openai.com/api/
https://github.com/ezzcodeezzlife/dalle-node
