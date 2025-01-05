ROLE := $(shell grep ROLE .env | cut -d '=' -f2)
DB_NAME := $(shell grep DB_NAME .env | cut -d '=' -f2)
DB_PASSWORD := $(shell grep DB_PASSWORD .env | cut -d '=' -f2)

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