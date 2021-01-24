import { JobInterface } from '../interfaces/data/job.interface'
import { AddressInterface } from '../interfaces/data/address.interface'
interface createDTO {
  username: string
  password: string
  email?: string
  name: string
  display_name?: string
  tel?: string
  address?: AddressInterface
  role?: string
  account_type: string
  account_description?: string
  juristic_id?: string
  verified?: boolean
  job_history?: JobInterface[]
  create_at?: Date
}
interface whitelistUpdateProfileForSrvDTO {
  username?: string
  password?: string
  email?: string
  verified?: boolean
  account_type?: string
}
interface whitelistUpdateProfileForShipperDTO {
  name?: string
  display_name?: string
  tel?: string
  address?: AddressInterface
  account_description?: string
  juristic_id?: string
}
interface identifierDTO {
  shipper_id?: string
  username?: string
}
interface deleteDTO {
  identifier: identifierDTO
  password: string
}
interface updateProfileDTO {
  identifier: identifierDTO
  profile: whitelistUpdateAccountProfileDTO
}
interface confirmedEmailDTO {
  identifier: identifierDTO
  email: string
}

type whitelistUpdateAccountProfileDTO = whitelistUpdateProfileForShipperDTO | whitelistUpdateProfileForSrvDTO

export {
  createDTO,
  updateProfileDTO,
  whitelistUpdateAccountProfileDTO,
  whitelistUpdateProfileForShipperDTO,
  whitelistUpdateProfileForSrvDTO,
  deleteDTO,
  confirmedEmailDTO,
  identifierDTO,
}
