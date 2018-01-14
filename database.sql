
-- Tables

CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
	task_date DATE DEFAULT now(),
	task VARCHAR(255) NOT NULL,
	completed VARCHAR(12) DEFAULT 'Not Complete',
	category_id INT REFERENCES "categories",
	priority_id INT REFERENCES "priority"
);

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category VARCHAR(50) NOT NULL
);

CREATE TABLE priority (
	id SERIAL PRIMARY KEY,
	priorities VARCHAR(50) NOT NULL
);