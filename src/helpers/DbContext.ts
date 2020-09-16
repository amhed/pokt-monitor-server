import { Entity, Connection, createConnection, ObjectType } from 'typeorm'
import { settings } from '@settings'

let conn: Promise<Connection>

export const getConnection = async () => {
  if (conn == null) {
    conn = createConnection(settings.ormConfig)
  }

  const resolved = await conn
  if (!resolved) {
    throw Error('Could not connect to the DB')
  }

  if (!resolved.isConnected) {
    conn = createConnection(settings.ormConfig)
    return await conn
  }

  return resolved
}

export const getRepository = async <Entity>(target: ObjectType<Entity>) => {
  const conn = await getConnection()
  return await conn.getRepository(target)
}