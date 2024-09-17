CREATE DATABASE UserManagement;

USE UserManagement;

-- Table for Admin
CREATE TABLE Admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Table for Operator
CREATE TABLE Operator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organization VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    authorized BOOLEAN NOT NULL
);

-- Example data for Admin
INSERT INTO Admin (username, password)
VALUES ('admin1', 'adminpassword');

-- Example data for Operator
INSERT INTO Operator (organization, username, password, authorized)
VALUES ('Org1', 'operator1', 'operatorpassword', TRUE);
