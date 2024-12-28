DB_NAME := airport_scheduling_staging

connect:
	psql -d $(DB_NAME)

create:
	psql \
		--echo-all \
		--command="CREATE DATABASE $(DB_NAME);" \
	> ./logs/create_db.log

	psql \
		--echo-all \
		--dbname=$(db_name) \
		--file=./scripts/create.sql \
	> ./logs/create.log

drop:
	psql \
		--echo-all \
		--dbname=postgres \
		--file=./scripts/drop.sql \
	> ./logs/drop.log

	psql \
		--echo-all \
		--command="DROP DATABASE $(DB_NAME);" \
	> ./logs/drop_db.log

seed:
	psql \
		--echo-all \
		--dbname=$(db_name) \
		--file=./scripts/seed.sql \
	> ./logs/seed.log

select:
	psql \
		--echo-all \
		--dbname=$(db_name) \
		--file=./scripts/select.sql \
