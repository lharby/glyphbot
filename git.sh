set -x
#!/bin/sh
cd /home/lharby/sites/glyphbot/
git pull
git add .
git commit -m "push new changes"
git push