interface createDTO {
  username: string
  password: string
  email?: string
  name: string
  display_name?: string
  tel?: string
  address?: string
  role?: string
  account_type: string
  account_description?: string
  juristic_id?: string
  verified?: boolean
  jobs?: string[]
  create_at?: Date
}

interface whitelistUpdateProfileDTO {
  name?: string
  display_name?: string
  tel?: string
  address?: string
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
  profile: whitelistUpdateProfileDTO
}
interface confirmedEmailDTO {
  identifier: identifierDTO
  email: string
}
interface updateJobHistoryDTO {
  shipper_id: string
  job_id: string
}

export { 
  createDTO, 
  updateProfileDTO, 
  whitelistUpdateProfileDTO, 
  deleteDTO, 
  confirmedEmailDTO, 
  identifierDTO, 
  updateJobHistoryDTO
}
