#!/bin/bash

# Set the URL of your website
WEBSITE_URL="https://www.ipm.in-smark.com/"

# Ping the website
PING_RESULT=$(curl --write-out '%{http_code}' --silent --output /dev/null "$WEBSITE_URL")

# Check the response code
if [ "$PING_RESULT" -eq 200 ]; then
    echo "Website is up and running!"
    echo $PING_RESULT
else
    echo "Error: Website is down or not responding correctly. Response code: $PING_RESULT"
fi
