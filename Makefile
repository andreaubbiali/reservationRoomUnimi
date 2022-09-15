.PHONY: build_docker_image start_docker_dev delete_docker_containers

help:
	@echo "build_docker_image			build the docker image"
	@echo "start_docker_dev				start the docker development"
	@echo "delete_docker_containers		delete containers created"

build_docker_image:
	docker build -t reservationroom .

start_docker_dev:
	./deploy/scripts/testDockerDevelopment.sh

delete_docker_containers:
	./deploy/scripts/deleteContainers.sh