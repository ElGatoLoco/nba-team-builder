npx tsc
cp package.json dist
cd dist
yarn --prod
rm yarn.lock package.json
mkdir shared
cp ../../../package.json shared
cd shared
yarn --prod
cd ..
mv shared/node_modules/* node_modules
rm -r shared
