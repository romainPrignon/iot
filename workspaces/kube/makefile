
include .env
export

use-context:
	kubectl config use-context ${ctx}

ns:
	kubectl create namespace ${ns}

setup:
	tsx ./tasks/setup.task.ts --env ${env}
