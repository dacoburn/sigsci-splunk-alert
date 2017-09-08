#!/bin/sh

APPFOLDER="TA-SigSci_Blacklist_Alert"
BASEDIR=~andrew/newBlacklist
SPLUNKDIR=/opt/splunk
SPLUNKAPP=$SPLUNKDIR/etc/apps
MYUSER=`whoami`


#Copy source from splunk install
sudo cp -R  $SPLUNKAPP/$APPFOLDER/ ./$APPFOLDER/
sudo chown -R $MYUSER:$MYUSER ./


CURVER=`cat ./$APPFOLDER/default/app.conf | grep -E "version\s=\s" | grep -oE "[0-9]+\.[0-9]+\.[0-9]+"`
MINVER=`echo $CURVER | grep -oE "[0-9]+$"`
STARTVER=`echo $CURVER | grep -oE "^[0-9]+\.[0-9]+"`
SUM=$(($MINVER + 1))
NEWVER="$STARTVER.$SUM"
SEDREG="s/version\s=\s$CURVER/version = $NEWVER/"
TARNAME="$APPFOLDER-$NEWVER.tar.gz"


cd $APPFOLDER/
#Delete all pyc files, not allowed! 
find ./ -type f -name \*.pyc -exec rm -rf "{}" \;

#Delete local folder, not allowed to have in app source
#Paranoid of making a mistake with rm so putting in full path
rm -rf $BASEDIR/$APPFOLDER/local

cd $BASEDIR


echo "Current Version: $CURVER"
echo "New Version: $NEWVER"

sed -i -- "s/version\s=\s$CURVER/version = $NEWVER/" ./$APPFOLDER/default/app.conf
sed -i -- "s/\"version\": \"[0-9]\+\.[0-9]\+\.[0-9]\+\"/\"version\": \"$NEWVER\"/" ./$APPFOLDER/app.manifest 
tar -czf $TARNAME $APPFOLDER
