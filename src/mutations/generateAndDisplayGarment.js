import ReactionError from "@reactioncommerce/reaction-error";
import fetch from "node-fetch";
import { generateAndDisplayGarmentInputSchema } from "../simpleSchemas.js";

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
  const { Avatars } = collections;
  // if (!userId) {
  //   throw new ReactionError("access-denied", "Guests cannot create avatars");
  // }

  // fetch Avatars from Account Ids
  const avatars = await avatarsByAccountId(context);

  var curlResponse = await makeCurlRequest(avatars, context, { base, target });

  console.log("🚀 ~ file: generateAndDisplayGarment.js ~ line 30 ~ generateAndDisplayGarment ~ curlResponse", curlResponse);

  // if fbx is returned update all avatars

  if (curlResponse && curlResponse.GarmentAvatarURL) {
    await Avatars.updateMany({ accountId: accountId },
      {
        $set: {
          fbx: curlResponse.GarmentAvatarURL,
        }
      },
      { upsert: true });
  }

  const AvatarHexes = avatars.map(a => a.skinHex);

  curlResponse.avatars = JSON.stringify(AvatarHexes);
  // await appEvents.emit("afterCurlRequest", { createdBy: accountId, curlResponse });
  await appEvents.emit("afterCurlRequest", { createdBy: accountId, curlResponse });
  return curlResponse;

}

// TODO: Make this actually call Avatar Service and return a reference ID (and access token?)
async function makeCurlRequest(avatars, context, curlDetails) {

  var { base: base, target: target } = curlDetails;

  // const opaqueAccountId = encodeAccountOpaqueId(context.accountId);
  // const opaqueAvatarId = encodeAvatarOpaqueId(_id);

  if (avatars.length > 0) {
    const latestAvatarData = avatars[0];
    if (latestAvatarData.modelUrl && latestAvatarData.modelUrl != null && latestAvatarData.modelUrl != "") {
      target.AvatarObjectURL = latestAvatarData.modelUrl;
    }
  }

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

  const dataJSON = await fetch(urlString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  }).then((res) => {
    if (!res.ok) {
      console.log("========>STATUS NOT OK" + res.statusText);
      throw Error(res.statusText);
    }
    return res.json();
  }).catch((err) => {
    console.log("========>THROWN ERROR" + err);
    console.error(`${err}`);
  });

  return dataJSON ? dataJSON : {};

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
    return avatars.reverse();
  } else {
    return [];
  }

}
