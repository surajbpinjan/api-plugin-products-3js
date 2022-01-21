import { encodeAccountOpaqueId, encodeAvatarOpaqueId } from "../../xforms/id.js";

/**
 * @name "Query.avatarById"
 * @method
 * @memberof MyPlugin/GraphQL
 * @summary resolver for the avatarById GraphQL query
 * @return {Promise<Object>} TODO
 */
export default async function getAvatar(parentResult, args, context) {

  const avatar = await context.queries.getAvatar(context);

  return {
    account: avatar ? encodeAccountOpaqueId(avatar.userId) : null,
    createdAt: avatar ? avatar.createdAt : null,
    updatedAt: avatar ? avatar.updatedAt : null,
    modelUrl: avatar ? avatar.modelUrl : null,
    textureUrl: avatar ? avatar.textureUrl : null,
    skinHex: avatar ? avatar.skinHex : "#5F3A2C",
    videoUrl: avatar ? avatar.videoUrl : null,
    _id: avatar ? encodeAvatarOpaqueId(avatar._id) : null
  };

}