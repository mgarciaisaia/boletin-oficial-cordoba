#!/bin/bash -e
mkdir -p ./pdfs/

while read file
do
  if [ -z "$file" ]
  then
    echo "Input is empty"
    exit 1
  fi

  base=$(basename "$file")
  if [ ! -e "./pdfs/${base}" ]
  then
    useragent=$(shuf -n 1 user-agents.txt)
    wget --directory-prefix=./pdfs/ --user-agent="$useragent" "$file" || echo "$file" >> download_errors.txt

    sleep_time=$(( ( RANDOM % 10 )  + 1 ))
    sleep $sleep_time
  fi
done
