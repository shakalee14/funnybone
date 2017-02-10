DROP TABLE IF EXISTS inventory;

CREATE TABLE IF NOT EXISTS inventory(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR,
  category VARCHAR,
  cost INTEGER,
  size VARCHAR(20),
  available BOOLEAN,
  quantity INTEGER,
  img VARCHAR
)
