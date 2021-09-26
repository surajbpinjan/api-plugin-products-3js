export default function threejsStartup(context) {

  const schemaExtension = {
    baseGarmentName: {
      type: String,
      optional: false
    },
    baseAvatarName: {
      type: String,
      optional: false
    },
    baseFabricMaterialName: {
      type: String,
      optional: false
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
      optional: false
    },
    fabricMetalnessValue: {
      type: Number,
      max: 1,
      min: 0,
      optional: false
    },
  };
  
    context.simpleSchemas.ProductVariant.extend(schemaExtension);
    context.simpleSchemas.CatalogProductVariant.extend(schemaExtension);
   
    // context.simpleSchemas.VariantBaseSchema.extend(schemaExtension);
    // context.simpleSchemas.CatalogVariantSchema.extend(schemaExtension);
  }