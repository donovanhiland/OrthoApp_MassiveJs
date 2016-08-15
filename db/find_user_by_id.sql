select * from users
join notes on (notes.patient =  users.id)
join appointments on (appointments.patient = users.id)
where id = $1;
