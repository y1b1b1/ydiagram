#!/bin/sh

echo "Begin init db..."

echo "remove old database ..."
mysql -u root -pybb19820605 -e "DROP DATABASE ydiagrams"
echo "create database ..."
mysql -u root -pybb19820605 -e "CREATE DATABASE ydiagrams"
echo "create tables ..."
mysql -u root -pybb19820605 ydiagrams -e "CREATE TABLE users (user VARCHAR(50), password VARCHAR(50))"
mysql -u root -pybb19820605 ydiagrams -e "CREATE TABLE udiagrams (user VARCHAR(50), diagramid INTEGER)"
mysql -u root -pybb19820605 ydiagrams -e "CREATE TABLE diagrams (diagramid INTEGER, title VARCHAR(50), content TEXT)"
