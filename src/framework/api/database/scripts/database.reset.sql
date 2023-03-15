DROP DATABASE IF EXISTS cms_example_1;
CREATE DATABASE cms_example_1;
USE cms_example_1;

CREATE TABLE cms_user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  profile_picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cms_group (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cms_permission (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cms_session (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE,
  token VARCHAR(255) UNIQUE,
  id_user INT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (id_user) REFERENCES cms_user (id)
);

CREATE TABLE x_cms_user_xx_cms_group (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT,
  id_group INT,
  FOREIGN KEY (id_user) REFERENCES cms_user (id),
  FOREIGN KEY (id_group) REFERENCES cms_group (id)
);

CREATE TABLE x_cms_group_xx_cms_permission (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_group INT,
  id_permission INT,
  FOREIGN KEY (id_group) REFERENCES cms_group (id),
  FOREIGN KEY (id_permission) REFERENCES cms_permission (id)
);

CREATE TABLE x_cms_user_xx_cms_permission (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT,
  id_permission INT,
  FOREIGN KEY (id_user) REFERENCES cms_user (id),
  FOREIGN KEY (id_permission) REFERENCES cms_permission(id)
);