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

export const requestSender = new SimpleSchema({
  "garment_system_name": String,
  "user_name": String,
  "color_value": Number,
  "render_frame1": Number,
  "render_frame2": Number,
  "render_frame3": Number,
  "render_frame4": Number
});

export const generateAndDisplayGarmentInputSchema = new SimpleSchema({
  "base": RequestBase,
  "target": RequestTarget
});