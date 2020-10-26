import { model, Model, Mongoose } from 'mongoose'
import { ShipperInterface } from '../entities/interfaces/data/shipper.interface'
import { ShipperSchema } from '../entities/schemas/shipper.schema'
import { createDTO, identifierDTO ,whitelistUpdateFieldDTO } from '../entities/dtos/shipper.dto'

import config from '../config/config'

class ShipperRepository {
  private static instance: ShipperRepository
  private _model: Model<ShipperInterface>
  private _collection: string

  constructor() {
    this._collection = config.db.mongo.collection!
    this._model = model<ShipperInterface>(this._collection, ShipperSchema)
  }

  public static getInstance(): ShipperRepository {
    if (!ShipperRepository.instance) {
      ShipperRepository.instance = new ShipperRepository()
    }
    return ShipperRepository.instance
  }

  // public async findAllShipper(): Promise<ShipperInterface[]> {
  //   const result = await this._model.find({})
  //   return result as ShipperInterface[]
  // }

  // public async findAllShippersInChannel(channel: { [key: string]: string }): Promise<ShipperInterface[]> {
  //   const result = await this._model.find(channel)
  //   return result as ShipperInterface[]
  // }

  public async findShipperByIdentifier(identifier: identifierDTO): Promise<ShipperInterface | null> {
    const result: ShipperInterface = (await this._model.findOne(identifier))!
    return result 
  }

  public async findPasswordHashedByIdentifier(identifier: identifierDTO): Promise<string | null> {
    const { password : hashed }  = await this._model.findOne(identifier) as ShipperInterface
    return hashed 
  }

  public async createShipperAccount(shipper_account: createDTO): Promise<string> {
    const mongooseModel = new this._model(shipper_account)
    const { _id: shipper_id } = await mongooseModel.save()
    return shipper_id as string
  }

  public async updateEmailByIdentifier(identifier: identifierDTO, email: string): Promise<string> {
    const { _id: shipper_id } = await this._model.updateOne(identifier, { $set: { email }})
    return shipper_id as string
  }
  // public async updateShipper(_id: string, dataUpdate: whitelistUpdateFieldDTO): Promise<number> {
  //   const result = await this._model.updateOne({ _id }, {
  //     $set: {
  //       ...dataUpdate,
  //     },
  //   })
  //   return result.n as number
  // }

  public async deleteShipperAccount(identifier: identifierDTO): Promise<number> {
    const result = await this._model.deleteOne(identifier)
    return result.deletedCount as number
  }

  public async deActivateShipperAccount(identifier: identifierDTO, username: string, bias: string): Promise<number> {
    const result = await this._model.updateOne(identifier, { $set: { username : bias + username }})
    return result.nModified as number
  }

}

export default ShipperRepository
