import { identifierDTO as ShipperIdentifier } from './shipper.dto'

interface getJobHistoryDTO {
  identifier: ShipperIdentifier
}
interface addJobHistoryDTO {
  identifier: ShipperIdentifier
  job_id: string
}
interface updateJobHistoryDTO {
  identifier: ShipperIdentifier
  job_id: string
}

export { getJobHistoryDTO, addJobHistoryDTO, updateJobHistoryDTO }
