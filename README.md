# iot

> capture, analyse, display sensors data

iot is a monorepo that contains:
- python code to interact with the raspberry pi pico
- nodejs code to store device's data into a postgres database
- database admin code to create and interact with the database
- ops code to create and interact with the kubernetes cluster
- react code to display the data

iot is essentially a data pipeline project. It is mainly IO bound and stateless. Therefore, it uses functional programming most of the time.

## Dependencies
- node
- pnpm
- react
- python
- uv
- docker
- k3d
- kubectl
- envsubst
