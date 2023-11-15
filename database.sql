/* Это референс. Отсюда мы просто копируем что бы перенести запрос в psql */

CREATE TABLE person(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255)
);

CREATE TABLE post(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  user_id INT REFERENCES person(id)
);