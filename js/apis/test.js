var base=require("../utils/baseRequest.js");

exports.getAnswer = obj => {
  return base.baseRequest({ ...obj }, "active/promote/getGoodsByCode", "GET", false)
    .then(res => {
      return res;
    })
    .catch(e => {
      throw e;
    });
};

