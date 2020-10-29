import { Document } from 'mongoose'

interface ShipperDocument extends Document {
    readonly shipper_id: string
    readonly username: string
    readonly password: string
    readonly email: string
    readonly name: string
    readonly display_name: string
    readonly tel: string
    readonly address: string
    readonly account_type: string
    readonly account_description: string
    readonly juristic_id: string
    readonly verified: boolean
    readonly jobs: string[]
    readonly create_at: Date
    readonly updated_at: Date 
}

type ShipperInterface = ShipperDocument

export {
    ShipperInterface
}