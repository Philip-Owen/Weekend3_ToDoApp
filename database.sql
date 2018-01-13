-- Table Structure

CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
	task_date DATE DEFAULT now(),
	task VARCHAR(255) NOT NULL,
	completed VARCHAR(12) DEFAULT 'Not Complete'
);
