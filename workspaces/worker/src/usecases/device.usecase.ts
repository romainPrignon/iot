import * as entity from "../entities/device.entity.js"
import * as repo from "../repositories/device.repository.js"
import { DatabaseException } from "@iot/data"
import { DuplicateEntityException } from "../app/exception.js"

const isUniqueConstraintException = (err: DatabaseException): boolean => err.context?.code === '23505'

export const createDevice = async (device: entity.Device): Promise<entity.Device> => {
  return await repo.createDevice(device).catch((err: Error) => {
    switch (true) {
      case err instanceof DatabaseException: {
        if (isUniqueConstraintException(err)) {
          throw new DuplicateEntityException('Device already exist', { cause: err, context: device })
        }
        throw err
      }
      default: {
        throw err
      }
    }
  })
}
