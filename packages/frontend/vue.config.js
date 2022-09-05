const config = {};
const localhost = (() => {
  const nets = require('os').networkInterfaces();
  return Object.values(nets)
    .reduce((pre, cur) => cur.concat(pre))
    .find((a) => /192\.168/.test(a.address)).address;
})();
console.log(localhost);
process.env.VUE_APP_HOST = localhost;

module.exports = config;
