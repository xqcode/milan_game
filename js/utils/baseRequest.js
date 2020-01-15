var axios =require("../libs/axios.js");
var webConfigure =require("../config/index.js");

const {API_ROOT} = webConfigure;

//nodeRequest
exports.baseRequest = (
  data,
  url,
  type = "POST",
  timeout = 100000,
  root = API_ROOT,
  isFormData
) => {
  const headers = { "Content-Type": "application/json;charset=UTF-8" };

  if (isFormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  const options = {
    url: url,
    method: type,
    baseURL: root,
    headers: headers,
    timeout: timeout
  };

  if (type === "GET" || type === "DELETE") {
    options.params = data;
  } else {
    options.data = data;
  }
  return axios(options).then(response => {
    let {
      data: { code, message, result },
      status
    } = response;
    // console.log("response", response);
    if (status === 200) {
      if (code !== 200) {
        return Promise.reject(new Error(message));
      }
      return Promise.resolve(result);
    }
    return Promise.reject(new Error("服务请求失败"));
  });
};

