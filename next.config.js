// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       serverActions: true,
//     },
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.svg$/,
//         issuer: /\.[jt]sx?$/, // Only apply to JS/TS files
//         use: ['@svgr/webpack'],
//       });
//       return config;
//     },
//   };
  
//   module.exports = nextConfig;
  
module.exports = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },

      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};
