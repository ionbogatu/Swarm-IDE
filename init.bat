::install dependencies
call npm install

::change to node_modules directory
cd node_modules

::install dependencies
rmdir /s /q acl-magic
git clone https://github.com/PrivateSky/acl-magic.git acl-magic
cd acl-magic
call npm install
cd ..

rmdir /s /q swarmcore
git clone https://github.com/PrivateSky/swarmcore.git swarmcore
cd swarmcore
call npm install
cd ..

rmdir /s /q transrest
git clone https://github.com/PrivateSky/transrest.git transrest
cd transrest
call npm install
cd ..

rmdir /s /q apersistence
git clone https://github.com/PrivateSky/apersistence.git apersistence
cd apersistence
call npm install
cd ..

rmdir /s /q whys
git clone https://github.com/PrivateSky/whys.git whys
cd whys
call npm install
cd ..

rmdir /s /q double-check
git clone https://github.com/PrivateSky/double-check.git double-check
cd double-check
call npm install
cd ..

rmdir /s /q safebox
git clone https://github.com/PrivateSky/safebox.git safebox
cd safebox
call npm install
cd ..

rmdir /s /q callflow
git clone https://github.com/PrivateSky/callflow.git callflow
cd callflow
call npm install
cd ..

rmdir /s /q pubsubshare
git clone https://github.com/PrivateSky/pubsubshare.git pubsubshare
cd pubsubshare
call npm install
cd ..

rmdir /s /q https-auto
git clone https://github.com/PrivateSky/https-auto.git https-auto
cd https-auto
call npm install
cd ..

::exits from node_modules directory
cd ..