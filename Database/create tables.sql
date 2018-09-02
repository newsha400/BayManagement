-- Database Design
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
masterbay int not null, 
palette int 
);

create table palette
(
id serial primary key,
width int not null,
length int not null,
height int not null,
dep text not null,
paletteClass text not null,
category text not null,
bay int 
);

alter table Bay add foreign key (palette) REFERENCES palette(id);

-- Testing
INSERT INTO masterbay (width, height, length) 
values (6,6,6);

insert into Bay (width, length, height, dep, bayClass, category, masterbay) 
values (5,5,5,'D1','C2','CAT3',1);

insert into palette (width, length, height, dep, category, bay, paletteclass) 
values (2,2,2,'D2','CAT1',2,'C3');

--get last generated serial value
select currval('palette_id_seq')
select max(id) as id from masterbay;

select * from bay order by dep;
SELECT * FROM Bay WHERE id = 3;
select * from palette order by id;
SELECT * FROM masterbay WHERE id = 1;

update bay set palette=0 where id =1;
update palette set category = 'CAT2' where id = 7;

select * from bay;
select * from palette;
select * from masterbay;

SELECT dep as value from Bay UNION SELECT dep from palette order by value;

