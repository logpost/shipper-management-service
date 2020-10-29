import { ShipperInterface } from '../entities/interfaces/data/shipper.interface'
import AccountRepository from '../repositories/account.repository'
import { hashing, compareHashed } from '../helper/hashing.handler'
import {
  createDTO,
  confirmedEmailDTO,
  identifierDTO,
  updateProfileDTO,
  deleteDTO
} from '../entities/dtos/shipper.dto'

async function adminFindShipperByIdentifier(identifier: identifierDTO): Promise<ShipperInterface> {
  try {
    const accountRepository = AccountRepository.getInstance()
    const data = await accountRepository.adminFindShipperByIdentifier(identifier)  
    if(data)
      return data
  } catch (error) {
    throw new Error(`400 : Save data is not successfully`)
  }
  throw new Error(`404 : username is not exist in database`)
}

async function findProfileShipperAccountByUsername(identifier: identifierDTO): Promise<ShipperInterface> {
  try {
    const accountRepository = AccountRepository.getInstance()
    const data = await accountRepository.findShipperByIdentifier(identifier)  
    if(data)
      return data
  } catch (error) {
    throw new Error(`400 : Save data is not successfully`)
  }
  throw new Error(`404 : username is not exist in database`)
}

async function createShipperAccount(shipper_account: createDTO): Promise<string> {
  const accountRepository = AccountRepository.getInstance()
  let { username, password } = shipper_account
  const account = await accountRepository.findShipperByIdentifier({ username })

  if(!account){
    if(password)
      shipper_account.password = await hashing(password)
    else
      throw new Error(`400 : Invalid input, Please input field password`)
    try {
      const shipper_id = await accountRepository.createShipperAccount(shipper_account)
      console.log("Create shipper account success: shipper_id is", shipper_id)
      return `201 : Create shipper account is successfully`
    } catch (error) {
      console.error(error)
      throw new Error(`400 : Save data is not successfully`)
    } 
  }
  throw new Error(`400 : Account is existing, create account didn't successfully`)
}

async function confirmedWithEmail(req: confirmedEmailDTO): Promise<string> {
  const accountRepository = AccountRepository.getInstance()
  let { identifier, email } =  req
  const account = await accountRepository.findShipperByIdentifier(identifier)

  if(account){
    try {
      await accountRepository.updateEmailByIdentifier(identifier, email)
      return `200 : Comfirmed, Email is update successfully`
    } catch (error) {
      console.error(error)
      throw new Error(`400 : Save data is not successfully`)
    }
  }
  throw new Error(`404 : your username is not exist in database.`)
}

async function updateProfileShipperAccount(req: updateProfileDTO): Promise<string> {
  const accountRepository = AccountRepository.getInstance()
  const { identifier, profile } = req

  try {
    await accountRepository.updateProfileShipperAccountByIdentifier(identifier, profile)
    return `200 : Updated, Profile is update successfully`
  } catch (error) {
    console.error(error)
    throw new Error(`400 : Update profile is not successfully`)
  }
}

async function deleteShipperAccount(req: deleteDTO): Promise<string> {
  const accountRepository = AccountRepository.getInstance()
  let { identifier , password } =  req
  let hash: string | null

  try {
    hash = await accountRepository.findPasswordHashedByIdentifier(identifier)
  } catch (error) {
    console.log(error)
    throw new Error(`404 : Invalid input, Your identifier is not exist`)  
  }

  if(hash){
    const match = await compareHashed(password, hash)
    if(match){
        const deleteResult: number = await accountRepository.deleteShipperAccount(identifier)
        if (deleteResult) 
          return `200 : Delete account is successfully`
        throw new Error(`404 : Delete data is not successfully, don't have data in Database`)
    }
    throw new Error(`400 : Invalid input, Your password is not match`)
  }  
  throw new Error(`404 : Invalid input, Your identifier is not exist`)  
}

async function deActivateShipperAccount(req: deleteDTO): Promise<string> {
  const bias: string = "_deactivete"
  const accountRepository = AccountRepository.getInstance()
  let { identifier , password } =  req
  let hash: string | null

  try {
    hash = await accountRepository.findPasswordHashedByIdentifier(identifier)
  } catch (error) {
    console.log(error)
    throw new Error(`404 : Invalid input, Your identifier is not exist`)  
  }

  if(hash){
    const match = await compareHashed(password, hash)
    if(match){
      try {
        const shipprt_account = await accountRepository.findShipperByIdentifier(identifier) as ShipperInterface
        const { username } = shipprt_account
        const nModified = await accountRepository.deActivateShipperAccount(identifier, username, bias)
        if(nModified >= 1)
              return `200 : DeActivate account is successfully`
      } catch (err) {
        throw new Error(`400 : DeActivate account is not successfully`)
      }
      throw new Error(`404 : Some profile information is not exist in database`)
    }
    throw new Error(`400 : Invalid input, Your password is not match`)
  }  
  throw new Error(`404 : Invalid input, Your identifier is not exist`)  
}

export default {
  adminFindShipperByIdentifier,
  updateProfileShipperAccount,
  findProfileShipperAccountByUsername,
  createShipperAccount,
  confirmedWithEmail,
  deleteShipperAccount,
  deActivateShipperAccount
}
