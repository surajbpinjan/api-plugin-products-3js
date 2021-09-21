export default function threejsStartup(context) {
    context.simpleSchemas.ProductVariant.extend({
        baseGarmentName: {
        type: String,
        optional: false
      }
    });
  
    context.simpleSchemas.CatalogProductVariant.extend({
        baseGarmentName: {
        type: String,
        optional: false
      }
    })
  }