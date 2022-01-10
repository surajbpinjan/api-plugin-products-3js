
export default async function generateVideoNImages(parentResult, { input }, context) {

  const { garment_system_name: garment_system_name, user_name: user_name, color_value: color_value, render_frame1: render_frame1, render_frame2: render_frame2, render_frame3: render_frame3, render_frame4: render_frame4 } = input;

  const { GarmentAvatarURL, GarmentAvatarType, GarmentURL, GarmentType, processingTime, avatars } = await context.mutations.generateVideoNImages(context, { garment_system_name, user_name, color_value, render_frame1, render_frame2, render_frame3, render_frame4 });

  return { GarmentAvatarURL, GarmentAvatarType, GarmentURL, GarmentType, processingTime, avatars };
}
