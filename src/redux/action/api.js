
const localEndpoint = "http://localhost:49555/api";
const remoteEndpoint = "https://yge.wvi.mybluehost.me/test/pharmabooks-api"; // Lukman
// const remoteEndpoint = 'http://192.168.43.156:49555/api'
// const remoteEndpoint = 'https://yge.wvi.mybluehost.me/new_mylikita_server/api'
export const apiURL =
  process.env.NODE_ENV === "production" ? remoteEndpoint : localEndpoint;
export const imageUrl = "http://localhost:49555/uploads/";

export const getImageUrl = (value) => {
  return imageUrl + value;
};

export function convertImage(imgUrl, callback) {
  const image = new Image();
  image.crossOrigin='anonymous';
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
    callback && callback(dataUrl)
    console.log("dataUrl")
    console.log(dataUrl)
    console.log("dataUrl")
  }
  image.src = imgUrl;
}


export function convertImageToBase64(url){
  let return_url='';
  convertImage(url,(dataUrl)=>{
    return_url=dataUrl
  })
  return return_url;
}


const token = localStorage.getItem("pharm_key_1");

const _postApi = (url, data = {}, success = (f) => f, error = (f) => f) => {
  fetch(`${apiURL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      if (response.status >= 400) {
        error(response);
      } else success(response);
    })
    .catch((err) => error(err));
};

const _fetchApi = (
  url,
  success = (f) => f,
  error = (f) => f,
  empty = (f) => f
) => {
  fetch(`${apiURL}${url.replace("+",'%2b')}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", authorization: token },
  })
    .then((raw) => raw.json())
    .then((response) => {
      if (response) {
        success(response);
      } else {
        console.log("Empty response");
        empty();
      }
    })
    .catch((err) => {
      error(err);
    });
};

const _deleteApi = (url, data = {}, callback = (f) => f, err_cb = (f) => f) => {
  // const { facilityId, username } = store.getState().auth.user;
  // data.facilityId = facilityId;
  // data.userId = username;

  fetch(`${apiURL}${url}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", authorization: token },
    body: data ? JSON.stringify(data) : null,
  })
    .then((raw) => raw.json())
    .then((response) => {
      if (response) {
        callback(response);
      } else {
        console.log("Empty response");
        // empty()
      }
    })
    .catch((err) => {
      err_cb(err);
    });
};
export { _postApi, _fetchApi, _deleteApi };
