--THIS SQL CODE IS NOT NEEDED ANYMORE BUT DON'T DELETE IT

CREATE DATABASE users;

USE users;

-- Table for Admin with email as username
CREATE TABLE IF NOT EXISTS Admin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE, -- Ensures email is unique
    password VARCHAR(255) NOT NULL
);

-- Table for Operator with email as username and phone number
CREATE TABLE IF NOT EXISTS Operator (
    id SERIAL PRIMARY KEY,
    organization VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, -- Ensures email is unique
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    authorized BOOLEAN NOT NULL
);
-- Inserting example data into Admin
INSERT INTO Admin (email, password)
VALUES 
    ('admin1@example.com', 'adminpassword1'),
    ('admin2@example.com', 'adminpassword2'),
    ('admin3@example.com', 'adminpassword3');

-- Inserting example data into Operator
INSERT INTO Operator (organization, email, password, phone_number, authorized)
VALUES 
    ('Org1', 'operator1@org1.com', 'operatorpassword1', '0555555555', TRUE),
    ('Org2', 'operator2@org2.com', 'operatorpassword2', '0566666666', FALSE),
    ('Org3', 'operator3@org3.com', 'operatorpassword3', '0577777777', TRUE);
