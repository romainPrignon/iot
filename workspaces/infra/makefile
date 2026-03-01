iot_region?=fra1
iot_cluster_name?=iot
iot_cluster_node_count?=1
iot_cluster_version?=v1.34.3

include .env
export

start:
	k3d --verbose cluster create ${iot_cluster_name} --servers ${iot_cluster_node_count} --image rancher/k3s:${iot_cluster_version}-k3s1

stop:
	k3d --verbose cluster delete ${iot_cluster_name}

apply:
	tsx ./tasks/apply.task.ts --stack ${stack}


## --private-network-uuid
create-pg:
	doctl databases create iot --region fra1 --size db-s-1vcpu-1gb --num-nodes 1 --engine pg

delete-pg:
	doctl databases delete $$(doctl databases list | grep iot | awk '{print $$1}') -f

get-pg-connection:
	@doctl databases connection $$(doctl databases list | grep iot | awk '{print $$1}') --format URI --no-header

get-pg-ca:
	@doctl databases get-ca $$(doctl databases list | grep iot | awk '{print $$1}') --no-header > ./certs/pg.prod.crt
