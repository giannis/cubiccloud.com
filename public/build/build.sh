#!/bin/bash
#
# this is build client script
# 
# @install: 
# $ chmod +x build.sh
#

echo "Start packing website resources"
node ../components/r.js/dist/r.js -o build-css.js
cd ../

#java -jar ../tools/yuicompressor-2.4.6.jar js/jsb.js -o js/release.js --charset utf-8
java -jar ../tools/yuicompressor-2.4.6.jar css/release.css -o css/release.css --charset utf-8 --type css
java -jar ../tools/yuicompressor-2.4.6.jar js/jsb.js -o js/release.js --charset utf-8

mv js/release.js js/release.js.foo
cat components/jquery/jquery.min.js >> js/release.js
cat js/release.js.foo >> js/release.js
rm js/release.js.foo

#echo "/*! Copyright 2025 - cubiccloud.com , licences: /licences.txt */"|cat - js/release.js > /tmp/out && mv /tmp/out js/release.js
echo "/*! Copyright 2025 - cubiccloud.com , licences: /licences.txt */"|cat - css/release.css > /tmp/out && mv /tmp/out css/release.css
echo "End packing website resources"
