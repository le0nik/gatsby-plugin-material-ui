const fs = require(`fs`);
const path = require(`path`);
const os = require(`os`);

// Copy and past from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-typography

exports.onPreBootstrap = ({ store }, pluginOptions) => {
  const program = store.getState().program;

  let module;
  if (pluginOptions.pathToStylesProvider) {
    module = `module.exports = require("${
      path.isAbsolute(pluginOptions.pathToStylesProvider)
        ? pluginOptions.pathToStylesProvider
        : path.join(program.directory, pluginOptions.pathToStylesProvider)
    }")`;
    if (os.platform() === `win32`) {
      module = module.split(`\\`).join(`\\\\`);
    }
  } else {
    module = null;
  }

  const dir = `${__dirname}/.cache`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(`${dir}/styles-provider-props.js`, module);
};
