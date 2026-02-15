include .env
export

## make manifest
manifest:
	helm repo update && rm -f manifest.yml && cat values.yml | envsubst | helm template postgres bitnami/postgresql --version 18.3.0 -f - > manifest.yml
