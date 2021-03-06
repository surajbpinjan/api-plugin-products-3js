export default function threejsStartup(context) {

  const schemaExtension = {
    baseGarmentName: {
      type: String,
      optional: true
    },
    baseAvatarName: {
      type: String,
      optional: true
    },
    avatarGarmentName: {
      type: String,
      optional: true
    },
    baseFabricMaterialName: {
      type: String,
      optional: true
    },
    fabricBaseMapImage: {
      type: String,
      optional: true
    },
    fabricNormalMapImage: {
      type: String,
      optional: true
    },
    fabricSpecularMapImage: {
      type: String,
      optional: true
    },
    fabricRoughnessValue: {
      type: Number,
      max: 1,
      min: 0,
      optional: true
    },
    fabricMetalnessValue: {
      type: Number,
      max: 1,
      min: 0,
      optional: true
    },
    fabricTextureValue: {
      type: Number,
      max: 25,
      min: 0,
      optional: true
    },
    imageUrls: {
      type: String,
      optional: true
    },
  };
  
    context.simpleSchemas.ProductVariant.extend(schemaExtension);
    context.simpleSchemas.CatalogProductVariant.extend(schemaExtension);
   
    // context.simpleSchemas.VariantBaseSchema.extend(schemaExtension);
    // context.simpleSchemas.CatalogVariantSchema.extend(schemaExtension);
  }