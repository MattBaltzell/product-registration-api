DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;

CREATE TABLE customers (
    username text PRIMARY KEY,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    company text,
    notes text,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku text NOT NULL UNIQUE,
    product_name text NOT NULL,
    product_family text NOT NULL,
    product_type text NOT NULL,
    product_description text NOT NULL,
    radio_freq text,
    web_url text NOT NULL
);

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id int NOT NULL,
    url text NOT NULL,
    alt_text text NOT NULL
);

CREATE TABLE resources(
    id SERIAL PRIMARY KEY,
    resource_name text NOT NULL,
    product_id int NOT NULL REFERENCES products ON DELETE CASCADE,
    url text NOT NULL
);

CREATE TABLE registrations(
    id SERIAL PRIMARY KEY,
    username text NOT NULL REFERENCES customers ON DELETE CASCADE,
    product_id int NOT NULL REFERENCES products ON DELETE CASCADE,
    serial_no text NOT NULL UNIQUE,
    registered_at timestamp with time zone NOT NULL
);




