import ReactionError from "@reactioncommerce/reaction-error";
import fetch from "node-fetch";
import { requestSender } from "../simpleSchemas.js";

const inputSchema = requestSender;

/**
 * @method generateVideoNImages
 * @summary Creates an Avatar, Saving it to the Avatar Collection
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Necessary input. See SimpleSchema
 * @returns {Promise<Object>} Object with `avatar` property containing the created avatar
 */
export default async function generateVideoNImages(context, input) {
  console.log("🚀 ~ file: generateVideoNImages.js ~ line 15 ~ generateVideoNImages ~ input", input)

  const cleanedInput = inputSchema.clean(input); // add default values and such
  inputSchema.validate(cleanedInput);

  const { garment_system_name: garment_system_name, user_name: user_name, color_value: color_value, render_frame1: render_frame1, render_frame2: render_frame2, render_frame3: render_frame3, render_frame4: render_frame4 } = cleanedInput;
  const { accountId, appEvents, collections, getFunctionsOfType, userId } = context;


  var curlResponse = await makeCurlRequest( context, { garment_system_name, user_name, color_value, render_frame1, render_frame2, render_frame3, render_frame4 });
  console.log("🚀 ~ file: generateVideoNImages.js ~ line 29 ~ generateVideoNImages ~ curlResponse", curlResponse)

  // await appEvents.emit("afterCurlRequest", { createdBy: accountId, curlResponse });
  await appEvents.emit("afterCurlRequest", { createdBy: accountId, curlResponse });
  return curlResponse;

}

// TODO: Make this actually call Avatar Service and return a reference ID (and access token?)
async function makeCurlRequest( context, curlDetails) {

  var { garment_system_name: garment_system_name, user_name: user_name, color_value: color_value, render_frame1: render_frame1, render_frame2: render_frame2, render_frame3: render_frame3, render_frame4: render_frame4 } = curlDetails;

  // @TODO: User real userId and sessionToken
  const postData = { garment_system_name, user_name, color_value, render_frame1, render_frame2, render_frame3, render_frame4 };

  const domain = "http://35.232.152.163:8000";
  const endpoint = "requestsender";

  const urlString = `${domain}/${endpoint}/`;

  const dataJSON = await fetch(urlString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  }).then((res) => {
    if (!res.ok) {
      console.log("🚀 ~ file: generateVideoNImages.js ~ line 58 ~ makeCurlRequest ~ res.statusText", res.statusText)
      throw Error(res.statusText);
    }
    return res.json();
  }).catch((err) => {
    console.log("🚀 ~ file: generateVideoNImages.js ~ line 62 ~ makeCurlRequest ~ err", err)
    console.error(`${err}`);
  });

  return dataJSON ? dataJSON : {};

}