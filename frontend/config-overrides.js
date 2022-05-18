const { removeModuleScopePlugin } = require('customize-cra')

// Required because otherwise, CRA won't allow us to link CSS/images
// Unless they're within src/
module.exports = removeModuleScopePlugin()
