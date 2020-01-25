const fetchApi = (method = 'get', endpoint, headers = {}, payload = {}) => {
  return fetch(endpoint, {
    method: method,
    headers: headers,
    body: JSON.stringify(payload),
  }).catch(e => {
    if (e.response && e.response.json) {
      e.response.json().then(json => {
        if (json) throw json
        throw e
      })
    } else {
      throw e
    }
  })
}
export default fetchApi
