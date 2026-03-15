import { $, ProcessOutput } from "zx"
import { getCurrentNamespace } from "./setup.task.js"

export const importImage = async (app: string, tag: string | undefined = 'latest'): Promise<ProcessOutput> => $`k3d image import -c k3d-iot ${app}:${tag}`

export const deleteSecret = async (app: string): Promise<ProcessOutput> => $`kubectl delete secret ${app} --ignore-not-found`
export const createSecret = async (app: string, envFile: string): Promise<ProcessOutput> => $`kubectl create secret generic ${app} --from-env-file=${envFile} --namespace=${getCurrentNamespace()}`

export const importSecret = async (app: string, envFile: string): Promise<ProcessOutput> => {
  await deleteSecret(app)
  return await createSecret(app, envFile)
}
