#!/bin/sh

ENV=$1
FROM_DIR=$2
TO_DIR=$3

[ -z "$ENV" ] && echo "Error: Must enter ENV" && exit 1
([ -z "$FROM_DIR" ] || [ -z "$TO_DIR" ]) && echo "Error: Must enter FROM_DIR and TO_DIR" && exit 1

CONFIGS="config"
for config_name in ${CONFIGS}; do
  echo "Info: Trying to create $config_name.json"
  CONFIG_PATH="$TO_DIR/$config_name.json"
  SOURCE_CONFIG_PATH="$FROM_DIR/$config_name.$ENV.json"
  if [[ -f $CONFIG_PATH ]]; then
    echo "Info: Config '$CONFIG_PATH' already exists"
  else
    mkdir -p $TO_DIR && cp $SOURCE_CONFIG_PATH $CONFIG_PATH
    echo "Info: Config '$CONFIG_PATH' created"
  fi
done

exit 0
