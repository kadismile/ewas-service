import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
  country: {
    type: String,
    required: [true, 'country is missing']
  },
  fullAddress: {
    type: String,
    required: [true, 'full address is missing']
  },
  countryCode: {
    type: String,
    required: [true, 'country code is missing']
  },
  longitude: {
    type: Number,
    required: [true, 'longitude missing']
  },
  latitude: {
    type: String,
    required: [true, 'latitude missing']
  },
  localGovt: {
    type: String,
    required: [true, 'Local Government is missing']
  },
  state: {
    type: String,
    required: [true, 'state is missing']
  },
},
{timestamps: true, versionKey: false }
);


const reportSchema = new Schema({
  reportTypeId: {
    type: String,
  },
  departmentId: {
    type: String,
  },
  reporterId: {
    type: String,
    required: [true, 'Please Add Reporter ID']
  },
  title: {
    type: String,
    required: [true, 'Add titleof report']
  },
  description: {
    type: String,
    required: [true, 'Add titleof report']
  },
  dateOfIncidence: {
    type: Date
  },
  intervention: {
    // if intevention is True Agency should be provided
    type: Boolean,
    default: false
  },
  agencyId: {
    type: Boolean
  },
  reoccurence: {
    type: Boolean,
  },
  status: {
    type: String,
    default: 'processing',
    enum:['processing', 'processed', 'pending']
  },

  address: {
    type: addressSchema,
    required: [true, 'Please Add Address']
  },

  isActive : {
    type: Boolean,
    default: true
  }
},
{timestamps: true, versionKey: false }
);

reportSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

reportSchema.pre('find', async function() {
  this.where({ isActive: true })
});

export const Report = model('Report', reportSchema);
