CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  studentID INT NOT NULL,
  name VARCHAR(30) NULL,
  password VARCHAR(255) NULL,
  departID INT NOT NULL,
  email VARCHAR(50) NULL,
  auth Boolean NOT NULL,
  PRIMARY KEY (id)
);