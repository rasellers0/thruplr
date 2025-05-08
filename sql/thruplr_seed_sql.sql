CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT,
  first_name varchar(20) DEFAULT NULL,
  middle_name varchar(20) DEFAULT NULL,
  last_name varchar(20) DEFAULT NULL,
  account_type varchar(20) DEFAULT NULL,
  email_address varchar(20) DEFAULT NULL,
  hash_creds blob,
  username varchar(30) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table user_demographics (
	user_demo_id int not null,
    user_id int,
    pronouns varchar(20),
    orientation varchar(20),
    dob varchar(12),
    race1 varchar(30),
    race2 varchar(30),
    ethnicity varchar(50),
    location varchar(100),
    primary key(user_demo_id),
    foreign key(user_id) references users(user_id)
);

create table user_details (
	user_detail_id int not null,
	user_id int,
	about_me text,
	religion varchar(30),
	politics varchar(50),
	family varchar(50),
	family_plans varchar(50),
	looking_for varchar(20),
	primary key(user_detail_id),
	foreign key(user_id) references users(user_id)
);



INSERT INTO users (user_id, first_name, middle_name, last_name, account_type, email_address, hash_creds, username) VALUES
(4, 'John', 'M', 'Doe', 'single', 'jd@ex.com', NULL, 'jdoe'),
(5, 'Alice', 'M', 'Smith', 'poly', 'as@ex.com', NULL, 'asmith'),
(6, 'Robert', 'J', 'Brown', 'single', 'rb@ex.com', NULL, 'rbrown'),
(7, 'Emily', 'A', 'Johnson', 'poly', 'ej@ex.com', NULL, 'ejohnson'),
(8, 'David', 'L', 'Williams', 'single', 'dw@ex.com', NULL, 'dwilliams'),
(9, 'Sophia', 'G', 'Jones', 'poly', 'sj@ex.com', NULL, 'sjones'),
(10, 'Michael', 'A', 'Garcia', 'single', 'mg@ex.com', NULL, 'mgarcia'),
(11, 'Isabella', 'R', 'Martinez', 'poly', 'im@ex.com', NULL, 'imartinez'),
(12, 'William', 'J', 'Rodriguez', 'single', 'wr@ex.com', NULL, 'wrodriguez'),
(13, 'Mia', 'E', 'Hernandez', 'poly', 'mh@ex.com', NULL, 'mhernandez'),
(14, 'James', 'E', 'Lopez', 'single', 'jl@ex.com', NULL, 'jlopez'),
(15, 'Olivia', 'C', 'Gonzalez', 'poly', 'og@ex.com', NULL, 'ogonzalez'),
(16, 'Benjamin', 'S', 'Wilson', 'single', 'bw@ex.com', NULL, 'bwilson'),
(17, 'Ava', 'L', 'Anderson', 'poly', 'aa@ex.com', NULL, 'aanderson'),
(18, 'Elijah', 'C', 'Thomas', 'single', 'et@ex.com', NULL, 'ethomas'),
(19, 'Charlotte', 'J', 'Taylor', 'poly', 'ct@ex.com', NULL, 'ctaylor'),
(20, 'Daniel', 'R', 'Moore', 'single', 'dm@ex.com', NULL, 'dmoore'),
(21, 'Amelia', 'F', 'Jackson', 'poly', 'aj@ex.com', NULL, 'ajackson'),
(22, 'Henry', 'G', 'Martin', 'single', 'hm@ex.com', NULL, 'hmartin'),
(23, 'Evelyn', 'H', 'Lee', 'poly', 'el@ex.com', NULL, 'elee');

INSERT INTO user_details (user_detail_id, user_id, about_me, religion, politics, family, family_plans, looking_for) VALUES
(2, 4, 'Love hiking and books.', 'Agnostic', 'Liberal', 'Single', 'Maybe someday', 'long-term'),
(3, 5, 'Tech nerd and coffee lover.', 'Christian', 'Moderate', 'No kids', 'Open to it', 'any'),
(4, 6, 'Music is life.', 'Atheist', 'Progressive', 'Single', 'Undecided', 'friends'),
(5, 7, 'Traveler and foodie.', 'Spiritual', 'Liberal', 'Divorced', 'No', 'short-term'),
(6, 8, 'Dog mom. Looking to connect.', 'Jewish', 'Liberal', 'Single', 'Yes', 'long-term'),
(7, 9, 'I enjoy the outdoors.', 'None', 'Conservative', 'Has kids', 'No', 'any'),
(8, 10, 'Bookworm and beach bum.', 'Catholic', 'Moderate', 'Single', 'Maybe someday', 'long-term'),
(9, 11, 'Gaming and tech.', 'None', 'Independent', 'No kids', 'Not sure', 'friends'),
(10, 12, 'Yoga and coffee.', 'Buddhist', 'Progressive', 'Single', 'Yes', 'long-term'),
(11, 13, 'Work hard, play harder.', 'Christian', 'Moderate', 'Has kids', 'No', 'any'),
(12, 14, 'Artist and dreamer.', 'Wiccan', 'Liberal', 'No kids', 'Yes', 'short-term'),
(13, 15, 'Love dogs and cooking.', 'None', 'Libertarian', 'Single', 'Not yet', 'long-term'),
(14, 16, 'Quiet and creative.', 'Agnostic', 'Progressive', 'Single', 'Maybe', 'friends'),
(15, 17, 'Love the gym and sports.', 'Christian', 'Conservative', 'No kids', 'Someday', 'any'),
(16, 18, 'Introvert with a loud mind.', 'Spiritual', 'Liberal', 'Single', 'Yes', 'long-term'),
(17, 19, 'Outdoorsy and active.', 'None', 'Moderate', 'Has kids', 'No', 'short-term'),
(18, 20, 'Big on books and wine.', 'Jewish', 'Liberal', 'Single', 'Yes', 'long-term'),
(19, 21, 'Social and friendly.', 'Muslim', 'Independent', 'No kids', 'Open to it', 'friends'),
(20, 22, 'Ambitious and focused.', 'Atheist', 'Libertarian', 'Single', 'Not yet', 'any'),
(21, 23, 'Plant parent and poet.', 'Spiritual', 'Progressive', 'Single', 'Maybe', 'long-term');

INSERT INTO user_demographics (user_demo_id, user_id, pronouns, orientation, dob, race1, race2, ethnicity, location) VALUES
(2, 4, 'he/him', 'straight', '04/12/1995', 'White', NULL, 'Non-Hispanic', 'Birmingham, Alabama'),
(3, 5, 'she/her', 'bisexual', '07/28/1990', 'Black', NULL, 'Non-Hispanic', 'Jackson, Mississippi'),
(4, 6, 'he/him', 'gay', '11/05/1998', 'Asian', 'White', 'Non-Hispanic', 'Gainesville, Florida'),
(5, 7, 'she/her', 'straight', '03/22/1996', 'Latino', NULL, 'Hispanic', 'Atlanta, Georgia'),
(6, 8, 'she/her', 'lesbian', '10/14/1992', 'White', NULL, 'Non-Hispanic', 'Chicago, USA'),
(7, 9, 'he/him', 'straight', '01/30/1989', 'Black', 'Native American', 'Non-Hispanic', 'Montgomery, Alabama'),
(8, 10, 'she/her', 'bisexual', '06/18/2000', 'Asian', NULL, 'Non-Hispanic', 'Orlando, Florida'),
(9, 11, 'he/him', 'gay', '08/09/1994', 'White', NULL, 'Non-Hispanic', 'Boston, USA'),
(10, 12, 'she/her', 'pansexual', '05/15/1993', 'Latino', NULL, 'Hispanic', 'Miami, Florida'),
(11, 13, 'he/him', 'straight', '09/25/1988', 'Asian', NULL, 'Non-Hispanic', 'San Jose, USA'),
(12, 14, 'she/her', 'queer', '12/02/1997', 'White', NULL, 'Non-Hispanic', 'Portland, USA'),
(13, 15, 'he/him', 'straight', '02/19/1991', 'Black', NULL, 'Non-Hispanic', 'Dallas, USA'),
(14, 16, 'she/her', 'bisexual', '03/10/1999', 'Asian', 'White', 'Non-Hispanic', 'London, UK'),
(15, 17, 'he/him', 'straight', '07/04/1993', 'Latino', NULL, 'Hispanic', 'Tallahassee, Florida'),
(16, 18, 'she/her', 'queer', '01/11/1996', 'White', NULL, 'Non-Hispanic', 'New York, USA'),
(17, 19, 'he/him', 'straight', '12/20/1990', 'Black', NULL, 'Non-Hispanic', 'Atlanta, Georgia'),
(18, 20, 'she/her', 'pansexual', '09/16/1995', 'Asian', NULL, 'Non-Hispanic', 'Mobile, Alabama'),
(19, 21, 'he/him', 'gay', '06/06/1992', 'White', NULL, 'Non-Hispanic', 'Edinburgh, UK'),
(20, 22, 'he/him', 'straight', '11/30/1997', 'Latino', 'Black', 'Hispanic', 'Houston, USA'),
(21, 23, 'she/her', 'asexual', '08/25/1994', 'Asian', NULL, 'Non-Hispanic', 'Melbourne, Australia');

