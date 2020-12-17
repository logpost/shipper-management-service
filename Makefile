ImageName := shipper-logpost
DockerPath := ./docker/stag.Dockerfile

GCP_ProjectID := logpost-298506
GCR_TagStaging := asisa.gcr.io/${GCP_ProjectID}/${ImageName}

SERVICE_NAME := boilerplate-typescript-fastify-clean-architecture
.DEFAULT_GOAL := setup
MONGO_AUTH_NAME := admin
POSTMAN_COLLECTION_PATH := test/_postman/collection/${SERVICE_NAME}_test.postman.collection.json
POSTMAN_ENVIRONMENT_PATH := test/_postman/environment/${SERVICE_NAME}_oopback.postman.environment.json

mgo-shutdown: shutdown-mongo-on-local
pm-github-action: postman-test-api-on-gh-action

shutdown-mongo-on-local:
	mongo --eval "db.getSiblingDB('${MONGO_AUTH_NAME}').shutdownServer()"

start-init:
	docker-compose up --build --force-recreate --renew-anon-volumes

compilation-and-run: 
	npm run build
	npm run start

start:
	docker-compose up --build

stop:
	@ echo "> Stop development environment"
	@ docker-compose down
	@ echo "> ----- Complete -----"

postman-test-api:
	newman run ${POSTMAN_COLLECTION_PATH} -e ${POSTMAN_ENVIRONMENT_PATH}  --verbose

postman-test-api-on-gh-action:
	sh postman.api_test.gh_action.sh

docker-build:
	docker build -f ${DockerPath} . -t ${GCR_TagStaging}
docker-push: 
	docker push ${GCR_TagStaging}

docker-build-push:
	make docker-build; \
	make docker-push;
	