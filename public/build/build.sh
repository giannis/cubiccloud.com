#!/bin/bash
#
# this is build client script
# for qcenter
# 
# @install: 
# $ chmod +x build.sh
#

echo "Start packing website resources"

node ../components/r.js/dist/r.js -o build.js
node ../components/r.js/dist/r.js -o build-css.js
node ../components/r.js/dist/r.js -o build-signin-css.js

cd ../
echo "Packing signin page js"
java -jar components/r.js/lib/closure/compiler.jar --js components/jquery/jquery.js --js components/jQuery-MD5/jquery.md5.js --js app/signin.js --js_output_file app/min/release-signin.js
#java -jar ../tools/yuicompressor-2.4.6.jar app/signin.js components/jQuery-MD5/jquery.md5.js components/jquery/jquery.js -o app/min/release-signin.js --charset utf-8 --type js

#uncomment after development
#java -jar ../tools/yuicompressor-2.4.6.jar css/min/style.css -o css/min/style.css --charset utf-8 --type css
#java -jar ../tools/yuicompressor-2.4.6.jar css/min/signin.css -o css/min/signin.css --charset utf-8 --type css

mv app/min/release.js app/min/release.js.foo
java -jar components/r.js/lib/closure/compiler.jar --js components/almond/almond.js --js_output_file app/min/release.js
cat app/min/release.js.foo >> app/min/release.js
rm app/min/release.js.foo

echo "/*! qcenter, Copyright 2013 - paramana.com , licences: /licences.txt */"|cat - app/min/release.js > /tmp/out && mv /tmp/out app/min/release.js
echo "/*! qcenter, Copyright 2013 - paramana.com , licences: /licences.txt */"|cat - app/min/release-signin.js > /tmp/out && mv /tmp/out app/min/release-signin.js
echo "/*! qcenter, Copyright 2013 - paramana.com , licences: /licences.txt */"|cat - css/min/style.css > /tmp/out && mv /tmp/out css/min/style.css
echo "/*! qcenter, Copyright 2013 - paramana.com , licences: /licences.txt */"|cat - css/min/signin.css > /tmp/out && mv /tmp/out css/min/signin.css
echo "End packing website resources"