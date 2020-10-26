import * as mongoose from 'mongoose'

export const ShipperSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    email: { type: String, unique: true, default: "not_confirm", sparse: true},
    name: { type: String, required: true, unique: true},
    display_name: { type: String, default: null },
    tel: { type: String, unique: true, default: null, sparse: true},
    address: { type: String, default: null},
    account_type: { type: String, required: true, default: 'personal'},
    account_description: { type: String, default: null},
    juristic_id: { type: String, unique: true, default: null, sparse: true},
    verified: { type: Boolean, default: false},
    jobs: { type: [String] },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } 
  },
)