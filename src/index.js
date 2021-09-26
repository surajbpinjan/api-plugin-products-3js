import pkg from "../package.json";
import threejsStartup from "./startup.js";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";
const threejsSchema = importAsString("./schema.graphql");
/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Plugin Products 3js",
    name: "api-plugin-products-3js",
    version: pkg.version,
    functionsByType: {
      startup: [threejsStartup],
      publishProductToCatalog: [threejsPublishProductToCatalog]
    },
    graphQL: {
      schemas: [threejsSchema]
    }
  });
}


function threejsPublishProductToCatalog(catalogProduct, { context, product, shop, variants }) {
  catalogProduct.variants && catalogProduct.variants.map((catalogVariant) => {
    const productVariant = variants.find((variant) => variant._id === catalogVariant.variantId);
    catalogVariant.baseGarmentName = productVariant.baseGarmentName;
    catalogVariant.baseAvatarName = productVariant.baseAvatarName;
    catalogVariant.baseFabricMaterialName = productVariant.baseFabricMaterialName;
    catalogVariant.fabricBaseMapImage = productVariant.fabricBaseMapImage|| null;
    catalogVariant.fabricNormalMapImage = productVariant.fabricNormalMapImage|| null;
    catalogVariant.fabricSpecularMapImage = productVariant.fabricSpecularMapImage|| null;
    catalogVariant.fabricRoughnessValue = productVariant.fabricRoughnessValue;
    catalogVariant.fabricMetalnessValue = productVariant.fabricMetalnessValue;
  });

}