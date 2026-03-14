restart:
  kubectl rollout restart deployment worker

logs:
  kubectl logs svc/worker --tail=100 -f

forward:
  kubectl port-forward svc/worker 4010:4010
