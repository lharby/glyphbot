set -x
#!/bin/bash
sleep $(( ($RANDOM % 1440)*60 + ($RANDOM % 60) ))
export PATH=$PATH:/usr/local/bin/node
whoami
pwd
env
cd /home/lharby/sites/glyphbot/
while read line; do export "$line";
done < .env
cd /home/lharby/sites/glyphbot/src/
/usr/local/bin/node index.js --experimental-modules
exec bash
