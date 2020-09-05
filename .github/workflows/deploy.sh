#!/bin/bash
set -e
user="ubuntu"

ls -lah;
pwd;

rm -rf .git
rm -rf .gitignore
git config --global user.email "mehulmpt@gmail.com"
git config --global user.name "Mehul Mohan"
mv .gitignore_cicd .gitignore
git init .
git add .
git commit -m "Deploying"
git remote add production ssh://$user@$AWS_HOST/~/webapp
git push --force production master

# ssh $user@$AWS_HOST "cd ~/codedamn/graphql && \
# docker-compose -f ./docker/compose/common.yml -f ./docker/compose/prod.yml build && \
# docker-compose -f ./docker/compose/common.yml -f ./docker/compose/prod.yml up --detach && \
# exit"