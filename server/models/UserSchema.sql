create table users (
  id serial primary key not null,
  type varchar(20) not null default 'user',
  firstname varchar(20) not null,
  lastname varchar(20) not null,
  email varchar(320) not null unique,
  password varchar(20) not null,
  phonenumber varchar(10),
  initialbalance numeric,
  monthlypaymentamount numeric,
  paymentfrequency integer,
  ett integer,
  status varchar(10) default 'pending'
);
