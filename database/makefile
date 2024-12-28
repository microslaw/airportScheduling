DB_NAME := airport_scheduling_staging
DB_PASSWORD := password

connect:
	psql \
		postgresql://postgres:$(DB_PASSWORD)@localhost:5432/postgres

create:
	psql \
		postgresql://postgres:$(DB_PASSWORD)@localhost:5432/postgres \
		--echo-all \
		--command="CREATE DATABASE $(DB_NAME);" \
	> ./logs/create_db.log

	psql \
		postgresql://postgres:$(DB_PASSWORD)@localhost:5432/$(DB_NAME) \
		--echo-all \
		--file=./scripts/create.sql \
	> ./logs/create.log

drop:
	psql \
		postgresql://postgres:$(DB_PASSWORD)@localhost:5432/$(DB_NAME) \
		--echo-all \
		--file=./scripts/drop.sql \
	> ./logs/drop.log

	psql \
		postgresql://postgres:$(DB_PASSWORD)@localhost:5432/postgres \
		--echo-all \
		--command="DROP DATABASE $(DB_NAME);" \
	> ./logs/drop_db.log

seed:
	psql \
		postgresql://postgres:$(DB_PASSWORD)@localhost:5432/$(DB_NAME) \
		--echo-all \
		--file=./scripts/seed.sql \
	> ./logs/seed.log

select:
	psql \
		postgresql://postgres:$(DB_PASSWORD)@localhost:5432/$(DB_NAME) \
		--echo-all \
		--file=./scripts/select.sql \
	> ./logs/select.log
