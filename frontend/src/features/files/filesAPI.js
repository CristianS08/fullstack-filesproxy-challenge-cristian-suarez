export const getFilesData = async (fileName = null) => {
  let url = "http://localhost:3001/files/data"
  if (fileName) {
    url += `?fileName=${encodeURIComponent(fileName)}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}
