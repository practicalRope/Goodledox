
/**
 * get google sheet request helper
 * @param {string} sheet Document Key
 * @param {number} [page = 1] Sheet number
 */
async function getSheetData(sheet, page = 1) {
  const url = `https://spreadsheets.google.com/feeds/cells/${sheet}/${page}/public/full?alt=json`;
  return await send(url);
}

/**
 * get google docrequest helper
 * @param {string} doc Document Key
 */
async function getDocData(doc) {
  const url = `https://docs.google.com/document/d/e/${doc}/pub`;
  return await send(url);
}

/**
 * Helper for doing requests
 * @param {string} url 
 */
async function send(url) {
  const res = await fetch(url);

  const data = (await res.headers
    .get("Content-Type")
    .startsWith("application/json"))
    ? await res.json()
    : await res.text();

  if (res.ok) {
    return data;
  } else {
    throw new Error(data);
  }
}

/**
 * Extract only the textContent of a googleDocument.
 * @param {string} value Domstring
 */
function extractDocText(value) {
  const d = new DOMParser().parseFromString(value, "text/html");
  
  // const nodes = d.querySelectorAll("#contents > :not(style)");
  // just get the spans....
  const nodes = d.querySelectorAll("#contents span");
  const text = [...nodes].reduce((acc,el) => acc += el.textContent+"\n","");
  return text;
}

/**
 * Parse a google sheet json response into a more usable json format.
 * @param {object} json 
 */
function parseSheetData(json) {
  if (json && json.feed && json.feed.entry) {
    return json.feed.entry.map((en) => {
      return {
        col: en["gs$cell"]["col"],
        row: en["gs$cell"]["row"],
        value: en["gs$cell"]["inputValue"],
        cellName: en["title"]["$t"],
      };
    });
  }
  throw "sheet parsing error";
}

export {
  getDocData,
  getSheetData,
  extractDocText,
  parseSheetData
}