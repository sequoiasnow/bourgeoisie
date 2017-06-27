#!/bin/bash

# Make sure we're in the source directory of the project.
cd "$( dirname "${BASH_SOURCE[0]}" )" 

echo "Removing Existing Git Repository..."
rm -rf ./git

echo "Creating New Git Repository..."
git init

hash yarn 2>/dev/null || { echo "Installing yarn..."; npm install -g yarn }
echo "Installing yarn dependencies"
yarn install

echo "Removing This Script..."
rm ./setup.sh

echo "Starting Server..."
yarn start

