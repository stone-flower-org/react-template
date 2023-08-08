#!/bin/sh

cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../

echo "Info: Trying to install husky deps"
yarn husky install

echo "Info: Creating local configs"
CONFIGS="config"
for config_name in ${CONFIGS}; do
  cp ./configs/$config_name.development.json ./configs/$config_name.local.json
done
