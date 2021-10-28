import pkg from "../package.json";
import threejsStartup from "./startup.js";
import resolvers from "./resolvers/index.js";
import mutations from "./mutations/index.js";
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
      resolvers,
      schemas: [threejsSchema]
    },
    mutations
  });
}


function threejsPublishProductToCatalog(catalogProduct, { context, product, shop, variants }) {
  catalogProduct.variants && catalogProduct.variants.map((catalogVariant) => {
    const productVariant = variants.find((variant) => variant._id === catalogVariant.variantId);
    catalogVariant.baseGarmentName = productVariant.baseGarmentName|| null;
    catalogVariant.baseAvatarName = productVariant.baseAvatarName|| null;
    catalogVariant.baseFabricMaterialName = productVariant.baseFabricMaterialName|| null;
    catalogVariant.fabricBaseMapImage = productVariant.fabricBaseMapImage|| null;
    catalogVariant.fabricNormalMapImage = productVariant.fabricNormalMapImage|| null;
    catalogVariant.fabricSpecularMapImage = productVariant.fabricSpecularMapImage|| null;
    catalogVariant.fabricRoughnessValue = productVariant.fabricRoughnessValue|| null;
    catalogVariant.fabricMetalnessValue = productVariant.fabricMetalnessValue|| null;
    catalogVariant.fabricTextureValue = productVariant.fabricTextureValue|| null;
    catalogVariant.avatarGarmentName = productVariant.avatarGarmentName|| null;
    catalogVariant.imageUrls = productVariant.imageUrls|| null;
  });

}