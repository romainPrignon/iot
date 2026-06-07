import { schema, withError, type models } from "@iot/data"
import type { Device } from "../entities/device.entity.js"
import { drizzleRef } from "../app/reference.js"
import { InvalidStateException } from "../app/exception.js"

const toEntity = (model: models.DeviceModel): Device => {
  return {
    id: model.id,
    serial: model.serial,
    createdAt: model.created_at,
  }
}

const toModel = (entity: Device): models.DeviceModel => {
  return {
    id: entity.id,
    serial: entity.serial,
    created_at: entity.createdAt
  }
}

export const createDevice = async (entity: Device): Promise<Device> => {
  const drizzle = drizzleRef.get()
  const [model] = await withError(() => drizzle.insert(schema.device).values([toModel(entity)]).returning())

  if (!model) throw new InvalidStateException('failed to return inserted data')

  return toEntity(model)
}
