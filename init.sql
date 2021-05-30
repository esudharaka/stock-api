create schema if not exists PRODUCTS collate utf8mb4_0900_ai_ci;
use PRODUCTS;

create table if not exists BRAND
(
	ID int auto_increment
		primary key,
	NAME varchar(255) null,
	CREATED_DATE_TS timestamp null,
	UPDATED_DATE_TS timestamp null
);

create table if not exists PRODUCT
(
	ID int auto_increment
		primary key,
	NAME varchar(255) not null,
	SLUG varchar(30) null,
	SKU varchar(20) not null,
	BRAND_ID int not null,
	CREATED_DATE_TS timestamp null,
	UPDATED_DATE_TS timestamp null,
	constraint PRODUCT_BRAND_ID_fk
		foreign key (BRAND_ID) references BRAND (ID)
);

create index PRODUCT_SKU_index
	on PRODUCT (SKU);

INSERT INTO BRAND (ID, NAME, CREATED_DATE_TS, UPDATED_DATE_TS) VALUES (1, 'DELL', '2021-05-27 03:41:16', '2021-05-27 03:42:00');
INSERT INTO BRAND (ID, NAME, CREATED_DATE_TS, UPDATED_DATE_TS) VALUES (2, 'APPLE', '2021-05-27 03:41:56', '2021-05-27 03:41:59');