-- create database
create database if not exists news character set = "UTF8";

-- use it
use news;

-- create the stories table
create or replace table stories (
    id int not null primary key auto_increment,
<<<<<<< HEAD
    url varchar(2048) not null, 
=======
    url varchar(2048) not null,
>>>>>>> 278f399a03f67ccb40c80ec9fe59b166249f0dbb
    title varchar(1024) null,       
    votes int not null default 0,
    createdOn datetime not null default now()
);
