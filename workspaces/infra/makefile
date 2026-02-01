# TODO: use js instead in prod
.PHONY: all

## --vpc-uuid string
create-kube:
	doctl kubernetes cluster create iot --region fra1 --version 1.34.1-do.2 --node-pool "name=iot;size=s-1vcpu-2gb;count=1;" --update-kubeconfig

delete-kube:
	doctl kubernetes cluster delete iot --dangerous -f --update-kubeconfig

## --private-network-uuid
create-pg:
	doctl databases create iot --region fra1 --size db-s-1vcpu-1gb --num-nodes 1 --engine pg

delete-pg:
	doctl databases delete $$(doctl databases list | grep iot | awk '{print $$1}') -f

get-pg-connection:
	@doctl databases connection $$(doctl databases list | grep iot | awk '{print $$1}') --format URI --no-header

get-pg-ca:
	@doctl databases get-ca $$(doctl databases list | grep iot | awk '{print $$1}') --no-header > ./certs/pg.prod.crt
