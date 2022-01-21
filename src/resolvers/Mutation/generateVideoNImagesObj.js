
export default async function generateVideoNImagesObj(parentResult, { input }, context) {

  const { 
    garment_system_name: garment_system_name, 
    user_name: user_name, 
    color_value: color_value, 
    hex_value: hex_value,
  } = input;

  const { image, video } = await context.mutations.generateVideoNImagesObj(context, { 
    garment_system_name, 
    user_name, 
    color_value, 
    hex_value,
  });

  return { image, video };
}
