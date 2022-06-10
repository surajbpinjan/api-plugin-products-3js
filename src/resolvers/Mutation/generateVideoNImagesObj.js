
export default async function generateVideoNImagesObj(parentResult, { input }, context) {

  const { 
    garment_system_name: garment_system_name, 
    user_name: user_name, 
    color_value: color_value, 
    hex_value: hex_value,
    number_of_messages: number_of_messages,
    useCache: useCache,
  } = input;

  const { image, video, reverse } = await context.mutations.generateVideoNImagesObj(context, { 
    garment_system_name, 
    user_name, 
    color_value, 
    hex_value,
    number_of_messages: number_of_messages,
    useCache,
  });

  return { image, video, reverse };
}
