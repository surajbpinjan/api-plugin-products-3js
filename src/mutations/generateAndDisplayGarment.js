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

  // fetch Avatars from Account Ids
  const curlPromise = makeCurlRequest(context, { base, target });
  const avatars = avatarsByAccountId(context);

  var results = await Promise.all([curlPromise, avatars]);

  if (results[0]) {
    var curlResponse = results[0];
    curlResponse.avatars = results[1];
  }

  var curlResponse = results[0];
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

  const urlString = `${domain}/${endpoint}/`;

  const data = await fetch(urlString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
    // body: JSON.stringify(dummyRequestJSON)
  }).catch((err) => {
    console.error(`${err}`);
  });

  try {
    const dataJSON = await data.json();
    return dataJSON;
  } catch (error) {
    console.log("*******Error parsing response to json.returning ******");
    return {};
  }

  // @TODO: Use return values from endpoint
  console.log("curl repsonse:::" + dataJSON);
  console.log("curl repsonse to string:::" + dataJSON.toString());
  // console.log("curl repsonse strigified:::" + JSON.stringify(dataJSON));

  // return data;

}


async function avatarsByAccountId(context) {
  const { collections, accountId } = context;
  const { Avatars } = collections;

  if (!accountId) throw new ReactionError("invalid-param", "You must provide accountId arguments");

  const avatars = await new Promise((resolve, reject) => {
    Avatars.find({ accountId: accountId }).toArray((err, items) => {
      if (err) {
        reject(err);
      }
      resolve(items);
    });
  });


  if (typeof (avatars) !== 'undefined' && avatars != null && avatars.length) {
    const Hexes = avatars.map(a => a.skinHex);
    return JSON.stringify(Hexes);
  } else {
    return JSON.stringify([]);
  }

}