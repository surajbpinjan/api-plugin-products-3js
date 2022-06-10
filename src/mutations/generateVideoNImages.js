import ReactionError from "@reactioncommerce/reaction-error";
import fetch from "node-fetch";
import { requestSender, Avatar } from "../simpleSchemas.js";

const inputSchema = requestSender;

/**
 * @method generateVideoNImages
 * @summary Creates an Avatar, Saving it to the Avatar Collection
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Necessary input. See SimpleSchema
 * @returns {Promise<Object>} Object with `avatar` property containing the created avatar
 */
export default async function generateVideoNImages(context, input) {
  var status = "SUCCESS";
  const cleanedInput = inputSchema.clean(input); // add default values and such
  inputSchema.validate(cleanedInput);

  const now = new Date();

  const {
    garment_system_name: garment_system_name,
    user_name: user_name,
    color_value: color_value,
    hex_value: hex_value,
    number_of_messages: number_of_messages,
    useCache: useCache,
    // fps: fps,
    // time: time,
    // render_frame1: render_frame1, 
    // render_frame2: render_frame2, 
    // render_frame3: render_frame3, 
    // render_frame4: render_frame4,
    // render_frame5: render_frame5,
    // render_frame6: render_frame6,
    // render_frame7: render_frame7,
    // render_frame8: render_frame8,
    // render_frame9: render_frame9,
    // render_frame10: render_frame10,
    // render_frame11: render_frame11,
    // render_frame12: render_frame12,
    // render_frame13: render_frame13,
    // render_frame14: render_frame14,
    // render_frame15: render_frame15,
    // render_frame16: render_frame16,
    // render_frame17: render_frame17,
    // render_frame18: render_frame18,
    // render_frame19: render_frame19,
    // render_frame20: render_frame20,
    // render_frame21: render_frame21,
    // render_frame22: render_frame22,
    // render_frame23: render_frame23,
    // render_frame24: render_frame24,
    // render_frame25: render_frame25,
    // render_frame26: render_frame26,
    // render_frame27: render_frame27,
    // render_frame28: render_frame28,
    // render_frame29: render_frame29,
    // render_frame30: render_frame30, 
  } = cleanedInput;
  const { accountId, appEvents, collections, getFunctionsOfType, userId } = context;
  console.log("🚀 ~ file: generateVideoNImages.js ~ line 60 ~ generateVideoNImages ~ accountId", accountId)
  const { Avatars } = collections;

  var userAvatar = await Avatars.findOne({ accountId: accountId }, { sort: { updatedAt: -1 } });


  if (useCache && userAvatar && userAvatar.image
    && (userAvatar.image != null)
    && userAvatar.image.length > 0) {
    var curlResponse = {
      image: userAvatar.image,
      video: userAvatar.videoUrl,
      reverse: userAvatar.reverseUrl,
      status: "SUCCESS"
    };
    await appEvents.emit("afterCurlRequest", { createdBy: accountId, curlResponse });
    return curlResponse;
  }

  const isFbxUrl = (userAvatar != null) && (userAvatar.fbx != null) && (userAvatar.fbx.length > 0);
  const garmentSystemName = isFbxUrl ? userAvatar.fbx : garment_system_name;
  console.log("🚀 ~ file: generateVideoNImages.js ~ line 67 ~ generateVideoNImages ~ garmentSystemName", garmentSystemName)

  var curlResponse = await makeCurlRequest(context, {
    garment_system_name,
    user_name,
    color_value,
    hex_value,
    number_of_messages,
    useCache,
    // fps,
    // time,
    // render_frame1,
    // render_frame2,
    // render_frame3,
    // render_frame4,
    // render_frame5,
    // render_frame6,
    // render_frame8,
    // render_frame7,
    // render_frame9,
    // render_frame10,
    // render_frame11,
    // render_frame12,
    // render_frame13,
    // render_frame14,
    // render_frame15,
    // render_frame16,
    // render_frame17,
    // render_frame18,
    // render_frame19,
    // render_frame20,
    // render_frame21,
    // render_frame22,
    // render_frame23,
    // render_frame24,
    // render_frame25,
    // render_frame26,
    // render_frame27,
    // render_frame28,
    // render_frame29,
    // render_frame30,
  });
  console.log("🚀 ~ file: generateVideoNImages.js ~ line 110 ~ generateVideoNImages ~ curlResponse", curlResponse);
  console.log("🚀 ~ file: generateVideoNImages.js ~ line 102 ~ generateVideoNImages ~ curlResponse", curlResponse.video);

  if (userAvatar) {
    await Avatars.updateMany({ accountId: accountId }, { $set: { videoUrl: curlResponse.video, image: curlResponse.images, updatedAt: now.toString() } });
  }

  // await appEvents.emit("afterCurlRequest", { createdBy: accountId, curlResponse });
  await appEvents.emit("afterCurlRequest", { createdBy: accountId, curlResponse });
  return curlResponse;

}

// TODO: Make this actually call Avatar Service and return a reference ID (and access token?)
async function makeCurlRequest(context, curlDetails) {

  var {
    garment_system_name: garment_system_name,
    user_name: user_name,
    color_value: color_value,
    hex_value: hex_value,
    number_of_messages: number_of_messages,
    // fps: fps,
    // time: time,
    // render_frame1: render_frame1,
    // render_frame2: render_frame2,
    // render_frame3: render_frame3,
    // render_frame4: render_frame4,
    // render_frame5: render_frame5,
    // render_frame6: render_frame6,
    // render_frame7: render_frame7,
    // render_frame8: render_frame8,
    // render_frame9: render_frame9,
    // render_frame10: render_frame10,
    // render_frame11: render_frame11,
    // render_frame12: render_frame12,
    // render_frame13: render_frame13,
    // render_frame14: render_frame14,
    // render_frame15: render_frame15,
    // render_frame16: render_frame16,
    // render_frame17: render_frame17,
    // render_frame18: render_frame18,
    // render_frame19: render_frame19,
    // render_frame20: render_frame20,
    // render_frame21: render_frame21,
    // render_frame22: render_frame22,
    // render_frame23: render_frame23,
    // render_frame24: render_frame24,
    // render_frame25: render_frame25,
    // render_frame26: render_frame26,
    // render_frame27: render_frame27,
    // render_frame28: render_frame28,
    // render_frame29: render_frame29,
    // render_frame30: render_frame30,
  } = curlDetails;

  // @TODO: User real userId and sessionToken
  const postData = {
    garment_system_name,
    user_name, color_value,
    hex_value,
    number_of_messages,
    // fps,
    // time,
    // render_frame1,
    // render_frame2,
    // render_frame3,
    // render_frame4,
    // render_frame5,
    // render_frame6,
    // render_frame8,
    // render_frame7,
    // render_frame9,
    // render_frame10,
    // render_frame11,
    // render_frame12,
    // render_frame13,
    // render_frame14,
    // render_frame15,
    // render_frame16,
    // render_frame17,
    // render_frame18,
    // render_frame19,
    // render_frame20,
    // render_frame21,
    // render_frame22,
    // render_frame23,
    // render_frame24,
    // render_frame25,
    // render_frame26,
    // render_frame27,
    // render_frame28,
    // render_frame29,
    // render_frame30,
  };

  const domain = "http://34.136.23.4:8000";
  const endpoint = "render_controller";

  const urlString = `${domain}/${endpoint}/`;

  const dataJSON = await fetch(urlString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.text();
  }).catch((err) => {
    console.log("🚀 ~ file: generateVideoNImages.js ~ line 157 ~ makeCurlRequest ~ err", err);
    console.error(`${err}`);
  });

  if (dataJSON) {
    var parsedData = JSON.parse(JSON.parse(dataJSON));
    parsedData.image = parsedData.images;
    parsedData.status = "SUCCESS";
    return parsedData;
  } else {
    return { status: "REQUEST_FAILED" }
  }

}

