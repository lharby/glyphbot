set -x
#!/bin/bash
export PATH=$PATH:/usr/local/bin/node
whoami
pwd
env
cd /home/lharby/sites/glyphbot/
while read line; do export "$line";
done < .env
cd /home/lharby/sites/glyphbot/src/
/usr/local/bin/node temp.js --experimental-modules
exec bash
