interface createDTO {
  username: string
  password: string
  email?: string
  name: string
  display_name?: string
  tel?: string
  address?: string
  account_type: string
  account_description?: string
  juristic_id?: string
  verified?: boolean
  jobs?: string[]
  create_at?: Date
}

interface identifierDTO {
  shipper_id?: string
  username?: string
}

interface confirmedEmailDTO {
  identifier: identifierDTO
  email: string
}

interface deleteDTO {
  identifier: identifierDTO
  password: string
}

interface updateDTO {
  _id: string
  task_name?: string
  task_content?: string 
}



interface whitelistUpdateFieldDTO {
  task_name?: string
  task_content?: string 
}

export { createDTO, updateDTO, whitelistUpdateFieldDTO, deleteDTO, confirmedEmailDTO, identifierDTO}
