#!/bin/bash
data=$(( ($RANDOM % 1440)*60 + ($RANDOM % 60) ))

echo $data >> /home/lharby/sites/glyphbot/src/log/cron-log.txt

exit