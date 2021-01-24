import { v4 as uuidv4 } from 'uuid'
import * as mongoose from 'mongoose'
import JobSchema from './job.schema'
import AddressSchema from './address.schema'

export const ShipperSchema = new mongoose.Schema(
  {
    shipper_id: { type: String, default: uuidv4, index: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    display_name: { type: String, default: null },
    account_description: { type: String, default: null },
    address: { type: AddressSchema, default: null },
    verified: { type: Boolean, default: false },
    role: { type: String, default: 'shipper' },
    account_type: {
      type: String,
      required: true,
      enum: ['personal', 'business'],
      default: 'personal',
      trim: true,
      lowercase: true,
    },
    email: { type: String, default: 'not_confirm', trim: true },
    tel: { type: String, default: null, trim: true },
    juristic_id: { type: String, default: null, trim: true },
    job_history: { type: [JobSchema], default: null },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)
