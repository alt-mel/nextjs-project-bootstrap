const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    mode: 'development'
  }, argv);

  // Add a catch-all rule for unknown file types
  config.module.rules.push({
    test: /\.(bin|null|unknown)$/,
    use: 'raw-loader',
    type: 'javascript/auto'
  });

  // Modify existing rules to handle assets
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      rule.oneOf = rule.oneOf.map(oneOf => {
        if (oneOf.type === 'asset/resource' || oneOf.type === 'asset') {
          return {
            ...oneOf,
            type: 'javascript/auto',
            generator: {
              filename: 'static/[hash][ext][query]'
            }
          };
        }
        return oneOf;
      });
    }
    return rule;
  });

  return config;
};
