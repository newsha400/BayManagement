create table masterbay
(
id serial primary key,
width int not null,
height int not null,
length int not null 
);

create table Bay
(
id serial primary key,
width int not null,
length int not null,
height int not null,
dep text not null,
bayClass text not null,
category text not null,
masterbay int not null references masterbay(id),
palette int 
);

create table palette
(
id serial primary key,
width int not null,
length int not null,
height int not null,
dep text not null,
palleteClass text not null,
category text not null,
bay int references Bay(id) 
);

alter table Bay add foreign key (palette) REFERENCES palette(id);

INSERT INTO masterbay (width, height, length) 
values (6,6,6);

insert into Bay (width, length, height, dep, bayClass, category, masterbay) 
values (5,5,5,'D1','C2','CAT3',1);