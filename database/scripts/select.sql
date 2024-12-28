SELECT
    id,
    producer_name,
    model_name,
    capacity,
    weight
FROM Flight;

SELECT
    id,
    id_model,
    serial_number
FROM Gate;

SELECT
    id,
    name,
    city,
    country,
    iata_code
FROM Plane;

SELECT
    id,
    id_plane,
    id_airport_departure,
    id_airport_arrival,
    departure_time,
    arrival_time
FROM Plane_model;

SELECT
    id,
    id_airport,
    name
FROM Airport;

\ dt
