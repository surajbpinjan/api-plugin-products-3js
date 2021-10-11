import SimpleSchema from "simpl-schema";

const RequestBase = new SimpleSchema({
  "AvatarObjectName": String,
  "AvatarBucketName": String,
  "GarmentObjectName": String,
  "GarmentBucketName": String,
  "GarmentAvatarObjectName": String,
  "GarmentAvatarBucketName": String
});

const RequestTarget = new SimpleSchema({
  "AvatarObjectURL": String,
  "GarmentAvatarBucketName": String,
  "GarmentBucketName": String
});

export const generateAndDisplayGarmentInputSchema = new SimpleSchema({
  "base": RequestBase,
  "target": RequestTarget
});