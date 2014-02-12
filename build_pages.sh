#!/bin/sh
cd public_html/pages

templates=( html_open html_close head footer author_wilf author_pedro author comments )
filename=""

for file in *.html
do

	filename=$file
	# get slug for filename
	slug=`grep "CUSTOMSLUG:[a-z]+*" $file | grep -o "[a-z][a-zA-Z0-9-]*"`
	if [ $slug ]
	then
		filename=$slug".html"
	fi

	IFS=''
	while read -r line
	do
		for template in ${templates[@]}
		do
			if [[ "$line" =~ "INCLUDE:$template" ]]
			then
				line=$(< ../template/$template.html)
			fi
			if [[ "$line" =~ "CUSTOMSLUG:" ]]
			then
				line=""
			fi

		done

		echo "$line"

	done < $file > t && mv t "../../$filename"

done
