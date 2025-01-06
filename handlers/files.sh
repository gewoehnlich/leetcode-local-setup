#!/bin/bash

directory=$filename

if [[ ! -d "$directory" ]]; then
    mkdir "$directory"
fi

for filetype in "${languages[@]}"
do
    file="$directory/$filename.$filetype"
    echo $file

    if [[ ! -f "$file" ]]; then
        touch "$file"
    elif [[ -s "$file" ]]; then
        read -p "Seems like the $file file already exists!\nDo you want to rewrite the file with a clear template? (Y/n)" input

        if [[ "$input" == "Y" ]]; then
            echo "User entered Y."
        else 
            echo "User did not entered Y."
        fi
    fi
done

