create table notes (
  id serial primary key not null,
  patient integer references users(id),
  category varchar(20) not null default 'instructions',
  date timestamptz not null default current_timestamp,
  text text not null
);
