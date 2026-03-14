# Worker

> nodejs code to store device's data into a postgres database

## Usage

### Tests

#### watch
```sh
just test -w
```

#### coverage
```sh
just test --coverage
```

## Structure

```
  |- bruno/           # bruno http client collection
  |- int/             # integration test utilities
  |- src/
    |- app/           # technical code
    |- config/        # app config
    |- entities/      # business entities. deep readonly POJO. called by usecases
    |- plugins/       # elysia plugins
    |- repositories/  # data access abstraction layer for database or apis. no business logic. called by usecases
    |- resolvers/     # elysia handler. called by routers
    |- routers/       # elysia routes.
    |- services/      # pure business logic. called by usecases
    |- usecases/      # business logic entrypoint. impure code
    |- utils/         # technical utility functions
  |- tasks/           # development tasks
  |- types/           # typescript custom global types
```
