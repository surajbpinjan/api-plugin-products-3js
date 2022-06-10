import ReactionError from "@reactioncommerce/reaction-error";
import fetch from "node-fetch";
import { requestSender, Avatar } from "../simpleSchemas.js";

const inputSchema = requestSender;

/**
 * @method generateVideoNImagesObj
 * @summary Creates an Avatar, Saving it to the Avatar Collection
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Necessary input. See SimpleSchema
 * @returns {Promise<Object>} Object with `avatar` property containing the created avatar
 */
export default async function generateVideoNImagesObj(context, input) {

  const cleanedInput = inputSchema.clean(input); // add default values and such
  inputSchema.validate(cleanedInput);

  const now = new Date();

  const {
    garment_system_name: garment_system_name,
    user_name: user_name,
    color_value: color_value,
    hex_value: hex_value,
    number_of_messages: number_of_messages,
  } = cleanedInput;
  const { accountId, appEvents, collections, getFunctionsOfType, userId } = context;
  const { Avatars } = collections;

  var userAvatar = await Avatars.findOne({ accountId: accountId }, { sort: { updatedAt: -1 } });

  const isModelUrl = (userAvatar != null) && (userAvatar.modelUrl != null) && (userAvatar.modelUrl.length > 0);
  const garmentSystemName = isModelUrl ? userAvatar.modelUrl : garment_system_name;

  var curlResponse = await makeCurlRequest(context, {
    garment_system_name: garmentSystemName,
    user_name,
    color_value,
    hex_value,
    number_of_messages,
  });

  if (userAvatar) {
    await Avatars.updateMany({ accountId: accountId }, { $set: { videoUrlObj: curlResponse.video, imageObj: curlResponse.images, updatedAt: now.toString() } });
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
    number_of_messages: number_of_messages
  } = curlDetails;

  // @TODO: User real userId and sessionToken
  const postData = {
    garment_system_name,
    user_name, 
    color_value,
    hex_value,
    number_of_messages
  };

  console.log("🚀 ~ file: generateVideoNImagesObj.js ~ line 66 ~ makeCurlRequest ~ postData", postData)

  const domain = "http://34.122.241.226:8000";
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
    return parsedData;
  } else {
    return {}
  }

}

