SERVICE_NAME=opire_front

up:
	@docker compose up -d

down:
	@docker compose down

setPermissions:
	sudo chown -R ${USER}:${USER} .

install: up
	@docker compose exec $(SERVICE_NAME) npm install $(deps)
	@docker compose exec $(SERVICE_NAME) chown -R node:node .

install/cicd:
	@docker compose up -d $(SERVICE_NAME)
	@docker compose exec $(SERVICE_NAME) npm install $(deps)
	@docker compose exec $(SERVICE_NAME) chown -R node:node .

update: up
	@docker compose exec $(SERVICE_NAME) npm update

upgrade: up
	@docker compose exec $(SERVICE_NAME) npm upgrade

audit-fix: up
	@docker compose exec $(SERVICE_NAME) npm audit fix --force

dev: up setPermissions
	@docker compose exec $(SERVICE_NAME) npm run dev

build/local: up setPermissions
	@docker compose exec $(SERVICE_NAME) npm run build
	@docker compose exec $(SERVICE_NAME) chown -R node:node .

build/production: up setPermissions
	@docker compose exec $(SERVICE_NAME) npm run build

build-image: up setPermissions
	@docker build -t $(REGISTRY)/$(REPOSITORY):$(TAG) .

start: up setPermissions
	@docker compose exec $(SERVICE_NAME) npm run start

lint: up
	@docker compose exec $(SERVICE_NAME) npm run lint

cpd: up
	@docker compose exec $(SERVICE_NAME) npm run cpd

node: up
	@docker compose exec $(SERVICE_NAME) $(cmd)
