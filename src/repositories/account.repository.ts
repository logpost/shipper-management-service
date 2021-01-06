import { model, Model } from 'mongoose'
import { ShipperInterface } from '../entities/interfaces/data/shipper.interface'
import { ShipperSchema } from '../entities/schemas/shipper.schema'
import { createDTO, identifierDTO, updateProfileDTO, whitelistUpdateProfileDTO } from '../entities/dtos/shipper.dto'

import config from '../config/config'
import { JobInterface } from 'src/entities/interfaces/data/job.interface'

class AccountRepository {
  private static instance: AccountRepository
  private _model: Model<ShipperInterface>
  private _collection: string

  constructor() {
    this._collection = config.db.mongo.collection!
    this._model = model<ShipperInterface>(this._collection, ShipperSchema)
  }

  public static getInstance(): AccountRepository {
    if (!AccountRepository.instance) {
      AccountRepository.instance = new AccountRepository()
    }
    return AccountRepository.instance
  }

  public async srvFindShipperByIdentifier(identifier: identifierDTO): Promise<ShipperInterface | null> {
    const result: ShipperInterface | null = await this._model.findOne(identifier)
    return result
  }

  public async findShipperByIdentifier(identifier: identifierDTO): Promise<ShipperInterface | null> {
    const result: ShipperInterface | null = await this._model.findOne(identifier, {
      _id: 0,
      password: 0,
      created_at: 0,
      updated_at: 0,
    })
    return result
  }

  public async findPasswordHashedByIdentifier(identifier: identifierDTO): Promise<string | null> {
    const { password: hashed } = (await this._model.findOne(identifier)) as ShipperInterface
    return hashed
  }

  public async createShipperAccount(shipper_account: createDTO): Promise<string> {
    const mongooseModel = new this._model(shipper_account)
    const { shipper_id } = await mongooseModel.save()
    return shipper_id as string
  }

  public async updateEmailByIdentifier(identifier: identifierDTO, email: string): Promise<string> {
    const { shipper_id } = await this._model.updateOne(identifier, { $set: { email } })
    return shipper_id as string
  }

  public async updateProfileShipperAccountByIdentifier(
    identifier: identifierDTO,
    profile: whitelistUpdateProfileDTO,
  ): Promise<string> {
    const { shipper_id } = await this._model.updateOne(identifier, { $set: profile })
    return shipper_id as string
  }

  public async deleteShipperAccount(identifier: identifierDTO): Promise<number> {
    const result = await this._model.deleteOne(identifier)
    return result.deletedCount as number
  }

  public async deActivateShipperAccount(identifier: identifierDTO, username: string, bias: string): Promise<number> {
    const result = await this._model.updateOne(identifier, { $set: { username: bias + username } })
    return result.nModified as number
  }

  public async updateJobHistory(identifier: identifierDTO, job: JobInterface): Promise<number> {
    const result = await this._model.updateOne(identifier, { $push: { job_history: job as JobInterface } })
    return result.n
  }

  public async deleteJobHistory(identifier: identifierDTO, job_id: string): Promise<number> {
    const result = await this._model.update(identifier, { $pull: { job_history: { job_id: job_id } as any } })
    return result.n
  }
}

export default AccountRepository
