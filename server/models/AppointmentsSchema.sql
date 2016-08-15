create table appointments (
  id serial primary key not null,
  patient integer references users(id),
  date timestamp,
  type varchar(20) default 'Short',
  duration numeric not null
);
