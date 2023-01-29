set -x
#!/bin/bash
export PATH=$PATH:/usr/local/bin/node
whoami
pwd
env
cd /home/lharby/sites/glyphbot/src
node index.js
