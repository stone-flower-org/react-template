#!/bin/sh

cd "$(dirname "${BASH_SOURCE[0]}")"

name=$(grep -w '../package.json' -e '"name"' | head -n 1 | sed 's/.*"\(.*\)",/\1/g')
version=$(grep -w '../package.json' -e '"version"' | head -n 1 | sed 's/.*"\(.*\)",/\1/g')

echo $name $version
