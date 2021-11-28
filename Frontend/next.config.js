module.exports = {
  env: {
    API_URL:"http://localhost:5002",
    FRONTEND_URL: "http://localhost:3000",
    SITE_KEY: "6Lcr4TMbAAAAANFGvhlh2824DI716LTWHnwcCbaS",
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  rewrites: async () => {
    return [
      {
        source: "/googleda3c109777b7b2af.html",
        destination: "/public/googleda3c109777b7b2af.html",
      },
    ];
  },
};
