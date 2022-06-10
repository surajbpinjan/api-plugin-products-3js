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

const UserInfo = new SimpleSchema({
  user_name: String,
  color_value: Number,
  hex_value: String,
  number_of_messages: Number
});

export const requestSender = new SimpleSchema({
  "garment_system_name": String,
  "user_name": String,
  "hex_value": String,
  "color_value": Number,
  "number_of_messages": Number,
  "useCache": {
    type: Boolean,
    optional: true,
    defaultValue: false
  }
  // "fps": Number,
  // "time": Number,
  // "render_frame1": Number,
  // "render_frame2": Number,
  // "render_frame3": Number,
  // "render_frame4": Number,
  // "render_frame5": Number,
  // "render_frame6": Number,
  // "render_frame7": Number,
  // "render_frame8": Number,
  // "render_frame9": Number,
  // "render_frame10": Number,
  // "render_frame11": Number,
  // "render_frame12": Number,
  // "render_frame13": Number,
  // "render_frame14": Number,
  // "render_frame15": Number,
  // "render_frame16": Number,
  // "render_frame17": Number,
  // "render_frame18": Number,
  // "render_frame19": Number,
  // "render_frame20": Number,
  // "render_frame21": Number,
  // "render_frame22": Number,
  // "render_frame23": Number,
  // "render_frame24": Number,
  // "render_frame25": Number,
  // "render_frame26": Number,
  // "render_frame27": Number,
  // "render_frame28": Number,
  // "render_frame29": Number,
  // "render_frame30": Number
});

export const generateAndDisplayGarmentInputSchema = new SimpleSchema({
  "base": RequestBase,
  "target": RequestTarget,
  "userinfo": UserInfo
});

export const Avatar = new SimpleSchema({
  _id: String,
  modelUrl: String,
  textureUrl: String,
  createdAt: String,
  updatedAt: String,
  accountId: String,
  skinHex: String,
  videoUrl: String,
  reverse: String,
  image: [String],
  videoUrlObj: String,
  imageObj: [String],
});