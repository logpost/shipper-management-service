import { ShipperInterface } from '../entities/interfaces/data/shipper.interface'
import ShipperRepository from '../repositories/shipper.repository'
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
    const shipperRepository = ShipperRepository.getInstance()
    const data = await shipperRepository.adminFindShipperByIdentifier(identifier)  
    if(data)
      return data
  } catch (error) {
    throw new Error(`400 : Save data is not successfully`)
  }
  throw new Error(`404 : username is not exist in database`)
}

async function findProfileShipperAccountByUsername(identifier: identifierDTO): Promise<ShipperInterface> {
  try {
    const shipperRepository = ShipperRepository.getInstance()
    const data = await shipperRepository.findShipperByIdentifier(identifier)  
    if(data)
      return data
  } catch (error) {
    throw new Error(`400 : Save data is not successfully`)
  }
  throw new Error(`404 : username is not exist in database`)
}

async function createShipperAccount(shipper_account: createDTO): Promise<string> {
  const shipperRepository = ShipperRepository.getInstance()
  let { username, password } = shipper_account
  const account = await shipperRepository.findShipperByIdentifier({ username })
  if(!account){

    if(password)
      shipper_account.password = await hashing(password)
    else
      throw new Error(`400 : Invalid input, Please input field password`)

    try {
      const shipper_id = await shipperRepository.createShipperAccount(shipper_account)
      console.log("Create shipper account success: shipper_id is", shipper_id)
      return `201 : Create shipper account is successfully`
    } catch (err) {
      console.error(err)
      throw new Error(`400 : Save data is not successfully`)
    } 

  }
  throw new Error(`400 : Account is existing, create account didn't successfully`)
}

async function confirmedWithEmail(req: confirmedEmailDTO): Promise<string> {
  const shipperRepository = ShipperRepository.getInstance()
  let { identifier, email } =  req
  try {
    await shipperRepository.updateEmailByIdentifier(identifier, email)
    return `200 : Comfirmed, Email is update successfully`
  } catch (err) {
    console.error(err)
    throw new Error(`400 : Save data is not successfully`)
  }
}

async function updateProfileShipperAccount(req: updateProfileDTO): Promise<string> {
  const shipperRepository = ShipperRepository.getInstance()
  const { identifier, profile } = req
  try {
    await shipperRepository.updateProfileShipperAccountByIdentifier(identifier, profile)
    return `200 : Updated, Profile is update successfully`
  } catch (err) {
    console.error(err)
    throw new Error(`400 : Save data is not successfully`)
  }
}

// async function updateTodo(reqUpdate: updateDTO): Promise<string> {
//   const ShipperRepository = ShipperRepository.getInstance()
//   const  { _id, ...dataUpdate } = reqUpdate
//   let updateResult: number
//   try {
//     updateResult = await ShipperRepository.updateTodo(_id, dataUpdate)
//   } catch (error) {
//     throw new Error(`400 : Update data is not successfully`)
//   }
//   if (updateResult) {
//     return `200 : Update data is successfully`
//   } else {
//     throw new Error(`400 : Page not found in database`)
//   }
// }

async function deleteShipperAccount(req: deleteDTO): Promise<string> {
  const shipperRepository = ShipperRepository.getInstance()
  const { identifier } = req

  const deleteResult: number = await shipperRepository.deleteShipperAccount(identifier)
  if (deleteResult) {
    return `200 : Delete account is successfully`
  } else {
    throw new Error(`400 : Delete data is not successfully, don't have data in Database`)
  }
}

async function deActivateShipperAccount(req: deleteDTO): Promise<string> {
  const bias: string = "_deactivete"
  const shipperRepository = ShipperRepository.getInstance()
  let { identifier , password } =  req
  let hash: string | null

    try {
      hash = await shipperRepository.findPasswordHashedByIdentifier(identifier)
    } catch (error) {
      console.log(error)
      throw new Error(`404 : Invalid input, Your identifier is not exist`)  
    }

    if(hash){

      const match = await compareHashed(password, hash)
      if(match){
  
        try {
          const shipprt_account = await shipperRepository.findShipperByIdentifier(identifier) as ShipperInterface
          const { username } = shipprt_account
          const nModified = await shipperRepository.deActivateShipperAccount(identifier, username, bias)

          if(nModified >= 1)
                return `200 : DeActivate account is successfully`

        } catch (err) {
          throw new Error(`400 : Save data is not successfully`)
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
  // updateTodo,
  // deleteTodo
}
