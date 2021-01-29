#!/bin/bash
mkdir -p ./pdfs/

while read file
do
  if [ -z "$file" ]
  then
    echo "Input is empty"
    exit 1
  fi
  useragent=$(shuf -n 1 user-agents.txt)
  wget --directory-prefix=./pdfs/ --user-agent="$useragent" "$file"
  sleep_time=$(( ( RANDOM % 10 )  + 1 ))

  sleep $sleep_time
done
