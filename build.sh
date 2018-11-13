#!/bin/bash

#ng build --aot --output-hashing=all
ng build -prod -aot -vc -cc -dop --buildOptimizer --output-hashing=all
#ng build -aot -vc -cc -dop --buildOptimizer --output-hashing=all
sshpass -p "angel007" scp dist/* root@gebruder.tk:/var/www/html
