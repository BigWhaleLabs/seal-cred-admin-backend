import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class AllowedAddress {
  @prop({ index: true, required: true })
  address!: string
}

export const AllowedAddressModel = getModelForClass(AllowedAddress)
