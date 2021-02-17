import { Document } from 'mongoose'
import { JobInterface } from './job.interface'
import { AddressInterface } from './address.interface'
import { OAuth2Interface } from './oauth2.interface'

interface ShipperDocument extends Document {
    readonly shipper_id: string
    readonly username: string
    readonly password: string
    readonly email: string
    readonly oauth2: OAuth2Interface
    readonly name: string
    readonly display_name: string
    readonly tel: string
    readonly address: AddressInterface
    readonly account_type: string
    readonly role: string
    readonly account_description: string
    readonly juristic_id: string
    readonly is_email_confirmed: boolean
    readonly is_verified: boolean
    readonly job_history: JobInterface[]
    readonly create_at: Date
    readonly updated_at: Date
}

type ShipperInterface = ShipperDocument

export { ShipperInterface }
