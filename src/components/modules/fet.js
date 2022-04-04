let fet = async (url, method, body) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject("Invalid URL");
    }
    if (! (url.startsWith("local") || url.startsWith("http"))) url = `http://localhost:6969${url}`
    if (!method) method = "GET";
    if (typeof(body) === "object") body = JSON.stringify(body)
    fetch(url, {
      method,
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((data) => data.json())
      .then((data) => {
        //console.log(data);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let hash = message => {
  return new Promise( async (resolve, reject) => {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
  
    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // convert bytes to hex string
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    resolve(hashHex);
  })
}

export { fet, hash };