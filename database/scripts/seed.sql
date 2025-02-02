INSERT INTO Plane_model (id, producer_name, model_name, capacity, weight) VALUES
(1, 'Boeing', '737', 200, 41000),
(2, 'Airbus', 'A320', 180, 42000);

INSERT INTO Plane (id, id_model, serial_number) VALUES
(1, 1, 'SN12345'),
(2, 2, 'SN67890');

INSERT INTO Airport (id, name, city, country, IATA_code) VALUES
(1, 'John F. Kennedy International Airport', 'New York', 'USA', 'JFK'),
(2, 'Los Angeles International Airport', 'Los Angeles', 'USA', 'LAX');

INSERT INTO Flight (
    id,
    id_plane,
    id_airport_departure,
    id_airport_arrival,
    departure_time,
    arrival_time
) VALUES
(1, 1, 1, 2, '2023-10-01 08:00:00', '2023-10-01 11:00:00'),
(2, 2, 2, 1, '2023-10-01 12:00:00', '2023-10-01 15:00:00');

INSERT INTO Gate (id, id_airport, name) VALUES
(1, 1, 'Gate A1'),
(2, 2, 'Gate B2');
