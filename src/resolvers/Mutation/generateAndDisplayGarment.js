
export default async function generateAndDisplayGarment(parentResult, { input }, context) {

  const { base: base, target: target } = input;

  // TODO: decode incoming IDs here
  // No Ids to decode?

  const { GarmentAvatarURL, GarmentAvatarType, GarmentURL, GarmentType, processingTime, avatars } = await context.mutations.generateAndDisplayGarment(context, {
    base, target
  });

  return {
    GarmentAvatarURL, GarmentAvatarType, GarmentURL, GarmentType, processingTime, avatars
  };
}
