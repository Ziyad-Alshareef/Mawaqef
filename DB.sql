CREATE DATABASE UserManagement;

USE UserManagement;

-- Table for Admin
CREATE TABLE IF NOT EXISTS Admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Table for Operator with phone number
CREATE TABLE IF NOT EXISTS Operator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organization VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL, -- Adding phone_number column
    authorized BOOLEAN NOT NULL
);

-- Example data for Admin
INSERT INTO Admin (username, password)
VALUES ('admin1', 'adminpassword');

-- Example data for Operator
INSERT INTO Operator (organization, username, password, phone_number, authorized)
VALUES ('Org1', 'operator1', 'operatorpassword', '0555555555', TRUE);
