DROP TABLE IF EXISTS inventory;

CREATE TABLE IF NOT EXISTS inventory(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR,
  available BOOLEAN,
  quantity INTEGER,
  img VARCHAR
)
