-- SQL database set up. This file is a script that sets up
-- a database called planner and creates a table called week

-- delete database planner if it exists

drop database if exists planner;

-- Creates database planner if it does not exist

create database if not exists planner;

-- Creates the table to store weeks

create table if not exists planner.week (
  weekNo tinyint primary key,
  lecTopic varchar(255) not null,
  labTopic varchar(255) not null,
  semTopic varchar(255),
  resources text
);
