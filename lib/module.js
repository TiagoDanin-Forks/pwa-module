module.exports = async function nuxtPWA (moduleOptions) {
  const modules = ['icon', 'manifest', 'meta', 'workbox']

  // All PWA options
  const options = { ...this.options.pwa, ...moduleOptions }

  // Merge legacy top-level options
  for (const name of modules) {
    if (this.options[name] === undefined) {
      options[name] = {}
      continue
    }
    // Backward compatibility
    options[name] = { ...this.options[name], ...options[name] }
  }

  // Execute modules in sequence
  for (const name of modules) {
    if (options[name] === false) {
      continue
    }
    const moduleFn = require(`./${name}/module.js`)
    await moduleFn.call(this, options)
  }
}

module.exports.meta = require('../package.json')
