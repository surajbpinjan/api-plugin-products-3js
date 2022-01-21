import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";

const namespaces = {
  Avatar: "reaction/avatar",
  Account: "reaction/account"
};

export const encodeAvatarOpaqueId = encodeOpaqueId(namespaces.Avatar);
export const decodeAvatarOpaqueId = decodeOpaqueIdForNamespace(namespaces.Avatar);

export const encodeAccountOpaqueId = encodeOpaqueId(namespaces.Account);
export const decodeAccountOpaqueId = decodeOpaqueIdForNamespace(namespaces.Account);
