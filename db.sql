CREATE database baitap1;
use baitap1;

CREATE Table users(
  id int auto_increment,
  full_name varchar(100),
  email varchar(100),
  password varchar(255),
  primary key(id)
);

CREATE table rate_res(
  id_user int,
  id_res int,
  amount int ,
  date_rate timestamp,
  primary key(id_user,id_res)
  
);

CREATE table restaurant(
  id int auto_increment,
  name varchar(100),
  image text,
  description text,
  primary key(id)
);

CREATE table like_res(
   id_user int,
   id_res int,
   date_like timestamp,
   status boolean,
   primary key(id_user,id_res)
 
);

CREATE table orders(
   id_user int ,
   id_food int,
   amount int,
   code varchar(100),
   arr_sub text,
   quantity int,
   primary key(id_user,id_food)
);

CREATE   table food(
  id int auto_increment,
  name varchar(100),
  image text,
  price double,
  description text,
  id_type int,
  primary key(id)
);

CREATE table food_type(
  id int auto_increment,
  name varchar(255),
  primary key(id)
);

ALTER TABLE rate_res
ADD CONSTRAINT FK_rate_res_user
FOREIGN KEY (id_user) REFERENCES users(id); 
ALTER TABLE rate_res
ADD CONSTRAINT FK_rate_res_restaurant
FOREIGN KEY (id_res) REFERENCES restaurant(id);
ALTER TABLE like_res
ADD CONSTRAINT FK_like_res_restaurant
FOREIGN KEY (id_res) REFERENCES restaurant(id);
ALTER TABLE like_res
ADD CONSTRAINT FK_like_res_users
FOREIGN KEY (id_user) REFERENCES users(id);
ALTER TABLE orders
ADD CONSTRAINT FK_orders_users
FOREIGN KEY (id_user) REFERENCES users(id);
ALTER TABLE orders
ADD CONSTRAINT FK_orders_food
FOREIGN KEY (id_food) REFERENCES food(id);
ALTER TABLE food
ADD CONSTRAINT FK_food_type_food
FOREIGN KEY (id_type) REFERENCES food_type(id);


SELECT COUNT(u.id) as solanlike,u.full_name  FROM users u 
join like_res lr on lr.id_user =u.id 
JOIN restaurant r on lr.id_res =r.id 
GROUP by u.full_name 
LIMIT 5;

SELECT COUNT(u.id) as solanlike,r.name  FROM users u 
join like_res lr on lr.id_user =u.id 
JOIN restaurant r on lr.id_res =r.id 
GROUP by r.name  
LIMIT 2;

SELECT COUNT(u.id) as solandat,u.full_name  FROM users u 
Join orders o on o.id_user  = u.id 
JOIN food f on f.id = o.id_food
GROUP by u.full_name 
ORDER by solandat DESC 
limit 1;

SELECT u.full_name ,rr.id_user as datphong ,o.id_user as orders ,lr.id_user as likes  FROM users u 
left join like_res lr on lr.id_user = u.id 
left join rate_res rr on rr.id_user = u.id 
left join orders o on o.id_user = u.id 
WHERE lr.id_user  is null and rr.id_user is null and o.id_user is null

