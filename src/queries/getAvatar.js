import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name avatarsByAccountId
 * @method
 * @memberof Avatar/NoMeteorQueries
 * @summary Query the Avatars collection for avatars made by the provided accountId
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>|undefined} - An Array of Avatar documents, if found
 */
export default async function getAvatar(context) {
  const { accountId } = context;
  const matchingAvatars = await avatarsByAccountId(context);

  if (matchingAvatars.length > 0) {
    return matchingAvatars[0];
  } else {
    return null;
  }
  
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
