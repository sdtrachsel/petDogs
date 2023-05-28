const getDogs = () => {
 return fetch('https://dog.ceo/api/breeds/image/random/12')
 .then(res=> {
  if(!res.ok){
    throw new Error(res.message)
  }
  return res.json()
 })
}

export { getDogs }