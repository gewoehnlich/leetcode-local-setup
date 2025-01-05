#!/bin/bash

directory=$filename

if [[ ! -d "$directory" ]]; then
    mkdir "$directory"
fi

for filetype in $languages
do
    file="$directory/$filename.$filetype"

    if [[ ! -f "$file" ]]; then
        touch "$file"
    elif [[ ! -s $file ]]; then
        
    fi
done
