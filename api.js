// axios.post('https://api.github.com/gists?access_token=d9671acc0201c04bc56458afdf935c8dfefe0f33', d)
// 	.then(res => {
//     	console.log(res.data)
// })

async function createGist(filename, description, content, access_token) {
  const gist = {
    "description": "",
    "public": true,
    "files": {}
  }
  gist[description] = description;
  gist[files][filename] = { content: content}

  try {
    // create gist
   const res = await axios.post(`https://api.github.com/gists?access_token=${access_token}`, gist);
   // send back to server so we save
   const back = await axios.post(`/recieve-gist`, {gistUrl: res.data.html_url, access_token: access_token});
   return back.gistUrl

  } catch (error) {
    console.log(error)
  }
}