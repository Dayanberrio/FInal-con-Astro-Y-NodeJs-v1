-- Crea la base de datos si no existe
CREATE DATABASE IF NOT EXISTS DEPOV;

-- Usa la base de datos
USE DEPOV;

-- Crea la tabla de registro
CREATE TABLE IF NOT EXISTS registro (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  depositCode VARCHAR(5) NOT NULL
);

-- Inserta un registro con el código de depósito 12345
INSERT INTO registro (username, password, email, depositCode) VALUES 
('defaultUser', 'defaultPassword', 'defaultEmail@example.com', '12345');
