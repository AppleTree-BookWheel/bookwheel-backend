CREATE USER bookwheel_admin WITH PASSWORD '1234';

CREATE DATABASE bookwheel OWNER bookwheel_admin;

\c bookwheel bookwheel_admin

\i /rdb/ddl.sql

\i /rdb/default-seed.sql

INSERT INTO user_tb (type, age) VALUES ('BASIC', 24);

INSERT INTO user_tb (nickname, type, age, gender) VALUES ('testUser2Nickname', 'BASIC', 25, 'FEMALE');

INSERT INTO user_basic_tb (user_idx, id, password, email) VALUES (2, 'testUser2Id', 'hashed_password_for_test2', 'test2@example.com');