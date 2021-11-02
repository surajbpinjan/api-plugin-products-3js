import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";
import Random from "@reactioncommerce/random";
import Logger from "@reactioncommerce/logger";
import { generateAndDisplayGarmentInputSchema } from "../simpleSchemas.js";
import fetch from "node-fetch";
import FormData from "form-data";

const inputSchema = generateAndDisplayGarmentInputSchema;

/**
 * @method generateAndDisplayGarment
 * @summary Creates an Avatar, Saving it to the Avatar Collection
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Necessary input. See SimpleSchema
 * @returns {Promise<Object>} Object with `avatar` property containing the created avatar
 */
export default async function generateAndDisplayGarment(context, input) {

  const cleanedInput = inputSchema.clean(input); // add default values and such
  inputSchema.validate(cleanedInput);
  
  const { base: base, target: target } = cleanedInput;
  const { accountId, appEvents, collections, getFunctionsOfType, userId } = context;

  // if (!userId) {
  //   throw new ReactionError("access-denied", "Guests cannot create avatars");
  // }

  // create the avatar asset with TFR Avatar Service
  const curlResponse = await makeCurlRequest(context, { base, target });

  await appEvents.emit("afterCurlRequest", { createdBy: accountId, curlResponse });

  return curlResponse;
}

// TODO: Make this actually call Avatar Service and return a reference ID (and access token?)
async function makeCurlRequest(context, curlDetails) {
  
  const { base: base, target: target } = curlDetails;

  // const opaqueAccountId = encodeAccountOpaqueId(context.accountId);
  // const opaqueAvatarId = encodeAvatarOpaqueId(_id);

  // @TODO: User real userId and sessionToken
  const postData = {
    base,
    target
  };

  // console.log(`Sending...`);
  // console.log(JSON.stringify(postData));
  const domain = "http://35.192.137.108:3000";
  const endpoint = "reformation";

  const urlString = `${domain}/${endpoint}`;

  const data = await fetch(urlString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // "Content-Type": "application/x-www-form-urlencoded"
      // "Content-Type": "multipart/form-data"
    },
    body: JSON.stringify(postData)
    // body: formData
  })
    .then((res) => res.json())
    // .then((data) => console.log(JSON.stringify(data)))
    .catch((err) => {
      console.error(`${err}`);
    });

  console.log(`Data is: ${JSON.stringify(data)}`);
  // @TODO: Use return values from endpoint
  return data;
}
