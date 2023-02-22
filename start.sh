set -x
#!/bin/bash
export PATH=$PATH:/usr/local/bin/node
whoami
pwd
env
cd /home/lharby/sites/glyphbot/src
while read line; do export "$line";
done < .env
/usr/local/bin/node index.js --experimental-modules
exec bash
