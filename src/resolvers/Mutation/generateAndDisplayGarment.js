
export default async function generateAndDisplayGarment(parentResult, { input }, context) {

  const { base: base, target: target, userinfo: userinfo } = input;

  // TODO: decode incoming IDs here
  // No Ids to decode?

  const { image, video, reverse, avatars } = await context.mutations.generateAndDisplayGarment(context, {
    base, target, userinfo
  });

  return {
    image, video, reverse, avatars
  };
}
