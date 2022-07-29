var __create = Object.create;
var __defProp = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropNames = Object.getOwnPropertyNames, __getOwnPropSymbols = Object.getOwnPropertySymbols, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b))
      __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  return a;
}, __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b)), __markAsModule = (target) => __defProp(target, "__esModule", { value: !0 });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 == "object" || typeof module2 == "function")
    for (let key of __getOwnPropNames(module2))
      !__hasOwnProp.call(target, key) && (copyDefault || key !== "default") && __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  return target;
}, __toESM = (module2, isNodeMode) => __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: !0 } : { value: module2, enumerable: !0 })), module2), __toCommonJS = /* @__PURE__ */ ((cache) => (module2, temp) => cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp))(typeof WeakMap != "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  publicPath: () => publicPath,
  routes: () => routes
});

// node_modules/@remix-run/dev/dist/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:C:\Users\WDJ\Desktop\projects\remix\OliviaStore\app\root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react3 = require("@remix-run/react");

// app/utils/CartProvider.tsx
var import_react2 = require("react"), import_zod = require("zod"), CartItem = import_zod.z.object({
  slug: import_zod.z.string(),
  name: import_zod.z.string(),
  price: import_zod.z.number(),
  image: import_zod.z.string()
}), CartCombined = import_zod.z.object({
  total: import_zod.z.number(),
  cart: import_zod.z.object({}).catchall(CartItem)
}), CartContext = (0, import_react2.createContext)(void 0);
function useCartState() {
  let [{ cart = {}, total = 0 }, setCart] = (0, import_react2.useState)(() => {
    if (typeof window < "u") {
      let valueInLocalStorage = window.localStorage.getItem("cart");
      if (valueInLocalStorage)
        return CartCombined.parse(JSON.parse(valueInLocalStorage));
    }
    return { cart: {}, total: 0 };
  });
  function addToCart(slug, name, price, image) {
    cart[slug] || setCart({
      cart: __spreadProps(__spreadValues({}, cart), { [slug]: { slug, name, price, image } }),
      total: total + price
    });
  }
  function removeFromCart(slug) {
    var _a;
    if (cart[slug]) {
      let removedPrice = import_zod.z.number().parse((_a = cart[slug]) == null ? void 0 : _a.price), newCart = __spreadValues({}, cart);
      delete newCart[slug], setCart({
        cart: newCart,
        total: total - removedPrice
      });
    }
  }
  function clearCart() {
    setCart({ cart: {}, total: 0 });
  }
  return (0, import_react2.useEffect)(() => {
    window.localStorage.setItem("cart", JSON.stringify({ cart, total }));
  }, [cart, total]), { cart, total, clearCart, addToCart, removeFromCart };
}
function CartProvider({ children }) {
  let cart = useCartState();
  return /* @__PURE__ */ React.createElement(CartContext.Provider, {
    value: cart
  }, children);
}
function useCart() {
  let context = (0, import_react2.useContext)(CartContext);
  if (context === void 0)
    throw new Error("useCart must be used within a CartContext provider");
  return context;
}

// app/styles/global.css
var global_default = "/build/_assets/global-NOQCB7FV.css";

// route:C:\Users\WDJ\Desktop\projects\remix\OliviaStore\app\root.tsx
function links() {
  return [{ rel: "stylesheet", href: global_default }];
}
var meta = () => ({
  charset: "utf-8",
  title: "Olivia Store",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react3.Meta, null), /* @__PURE__ */ React.createElement(import_react3.Links, null)), /* @__PURE__ */ React.createElement(CartProvider, null, /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react3.Outlet, null), /* @__PURE__ */ React.createElement(import_react3.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react3.Scripts, null), /* @__PURE__ */ React.createElement(import_react3.LiveReload, null))));
}

// route:C:\Users\WDJ\Desktop\projects\remix\OliviaStore\app\routes\product\$product.tsx
var product_exports = {};
__export(product_exports, {
  default: () => ProductRoute,
  links: () => links2,
  loader: () => loader
});
var import_react4 = require("@remix-run/react"), import_react5 = require("@remix-run/react");

// app/utils/db.server.ts
var import_client = require("@prisma/client"), db;
global.__db || (global.__db = new import_client.PrismaClient()), db = global.__db;

// app/styles/product.css
var product_default = "/build/_assets/product-7T5WSE2P.css";

// route:C:\Users\WDJ\Desktop\projects\remix\OliviaStore\app\routes\product\$product.tsx
var links2 = () => [{ rel: "stylesheet", href: product_default }];
async function loader(args) {
  return {
    product: await db.product.findUnique({
      where: {
        slug: args.params.product
      }
    })
  };
}
function ProductRoute() {
  let { addToCart } = useCart(), { product } = (0, import_react5.useLoaderData)();
  console.log({ product });
  function handleOnClick() {
    product && addToCart(product.slug, product.name, product.price, product.featuredImage);
  }
  return product ? /* @__PURE__ */ React.createElement("div", {
    className: "product-wrapper"
  }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", null, "Menu"), /* @__PURE__ */ React.createElement(import_react4.Link, {
    to: "/",
    className: "link"
  }, "Store Name"), /* @__PURE__ */ React.createElement("div", null, "Cart")), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("section", {
    className: "pictures"
  }, /* @__PURE__ */ React.createElement("img", {
    src: `/${product.featuredImage}`,
    alt: product.description
  }), product.images.map((image, index) => /* @__PURE__ */ React.createElement("img", {
    src: `/${image}`,
    key: index,
    alt: product.description
  }))), /* @__PURE__ */ React.createElement("section", {
    className: "right-side"
  }, /* @__PURE__ */ React.createElement("h1", null, product.name), /* @__PURE__ */ React.createElement("h2", null, product.description), /* @__PURE__ */ React.createElement("h3", null, "$", product.price), /* @__PURE__ */ React.createElement("button", {
    onClick: handleOnClick
  }, "Add To Cart"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("h4", null, product.details)), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("h4", null, product.details)), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("h4", null, product.details)), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("h4", null, product.details)))))) : /* @__PURE__ */ React.createElement("div", null, "Not a product");
}

// route:C:\Users\WDJ\Desktop\projects\remix\OliviaStore\app\routes\index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  links: () => links3,
  loader: () => loader2
});
var import_react7 = require("@remix-run/react");
var import_react8 = require("@remix-run/react");

// app/components/productCard.tsx
var import_react6 = require("@remix-run/react");
function ProductCard({ name, price, image, slug }) {
  return /* @__PURE__ */ React.createElement(import_react6.Link, {
    to: `/product/${slug}`,
    className: "product-card stacked"
  }, /* @__PURE__ */ React.createElement("img", {
    className: "product-image",
    src: image,
    alt: "couch"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "product-specials"
  }, "Back in stock"), /* @__PURE__ */ React.createElement("div", {
    className: "product-content"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "product-name"
  }, name), /* @__PURE__ */ React.createElement("p", {
    className: "product-price"
  }, "$", price)));
}

// app/styles/index.css
var styles_default = "/build/_assets/index-VB4TQYXD.css";

// route:C:\Users\WDJ\Desktop\projects\remix\OliviaStore\app\routes\index.tsx
var links3 = () => [{ rel: "stylesheet", href: styles_default }];
async function loader2() {
  return {
    productList: await db.product.findMany()
  };
}
function Index() {
  let { productList } = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "wrapper"
  }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", null, "Menu"), /* @__PURE__ */ React.createElement(import_react8.Link, {
    to: "/",
    className: "link"
  }, "Store Name"), /* @__PURE__ */ React.createElement("div", null, "Cart")), /* @__PURE__ */ React.createElement("main", {
    className: "product-grid"
  }, productList.map((product) => /* @__PURE__ */ React.createElement(ProductCard, {
    key: product.id,
    name: product.name,
    price: product.price,
    image: product.featuredImage,
    slug: product.slug
  }))));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "4e343c4e", entry: { module: "/build/entry.client-Q2RUFYPH.js", imports: ["/build/_shared/chunk-ZY3VD46R.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-GZ37UE2A.js", imports: ["/build/_shared/chunk-ARYYPDRJ.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-ZCJUNNTV.js", imports: ["/build/_shared/chunk-C4WBDYGV.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/product/$product": { id: "routes/product/$product", parentId: "root", path: "product/:product", index: void 0, caseSensitive: void 0, module: "/build/routes/product/$product-MTKXRQMP.js", imports: ["/build/_shared/chunk-C4WBDYGV.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-4E343C4E.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/product/$product": {
    id: "routes/product/$product",
    parentId: "root",
    path: "product/:product",
    index: void 0,
    caseSensitive: void 0,
    module: product_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  publicPath,
  routes
});
//# sourceMappingURL=server.js.map
