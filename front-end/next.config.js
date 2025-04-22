// next.config.js
module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        assert: require.resolve("assert"),
        util: require.resolve("util"),
        os: require.resolve("os-browserify/browser")
      };
      return config;
    }
  };
  