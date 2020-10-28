import * as mongoose from 'mongoose'

export const ShipperSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    display_name: { type: String, default: null },
    account_description: { type: String, default: null },
    address: { type: String, default: null },
    verified: { type: Boolean, default: false },
    account_type: { type: String, required: true, default: 'personal' },
    jobs: { type: [ String ] },
    email: { type: String, default: 'not_confirm' },
    tel: { type: String, default: null },
    juristic_id: { type: String, default: null },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } 
  },
)