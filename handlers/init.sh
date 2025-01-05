#!/bin/bash

source init.conf


filename=$1

if [[ -z "$filename" ]]; then
    echo "You need to provide a filename in the first parameter!\n
All parameters that are passed after the first gonna be interpreted as languages.\n
Example: ./init.sh 123 py cpp c php"
    exit 1
fi


declare -a languages
if [[ -z "$2" ]]; then
    languages=(${DEFAULT_LANGUAGES[@]})
else 
    shift
    languages=($@)
fi


