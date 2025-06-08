const axios = require('axios')
const { parseCSVContent } = require('../utils/parser')

// The API base URL and Bearer token should be stored in environment variables
// instead of hardcoding them in the source code for better security and flexibility.
const API_BASE = 'https://echo-serv.tbxnet.com/v1/secret'
const AUTH_HEADER = { headers: { authorization: 'Bearer aSuperSecretKey' } }

/**
 * Fetches the list of available CSV file names from the external API.
 *
 * @returns {Promise<string[]>} - Array of file names
 */
const getFileList = async () => {
  const res = await axios.get(`${API_BASE}/files`, AUTH_HEADER)
  console.log('File list fetched:', res.data.files)
  return res.data.files
}

/**
 * Fetches the raw CSV content of a specific file from the external API.
 * Handles errors gracefully and logs any failures.
 *
 * @param {string} file - File name to fetch
 * @returns {Promise<string|null>} - Raw CSV content or null if failed
 */
const fetchFile = async (file) => {
  try {
    const res = await axios.get(`${API_BASE}/file/${file}`, AUTH_HEADER)
    return res.data
  } catch (err) {
    console.warn(`[WARN] Could not fetch file ${file}: ${err.message}`)
    return null
  }
}

/**
 * Retrieves and parses one or more files.
 * If a fileName is provided, fetches only that file;
 * otherwise, fetches all files from the list.
 * Only valid CSV lines (based on parser validation) are included.
 *
 * @param {string|null} fileName - Specific file name to filter by (optional)
 * @returns {Promise<Array<{file: string, lines: Array<Object>}>>}
 */
const getFormattedFiles = async (fileName) => {
  const files = fileName ? [fileName] : await getFileList()
  const result = []

  for (const file of files) {
    const content = await fetchFile(file)
    if (!content) continue

    console.log(`File content: ${content}`)

    const lines = parseCSVContent(content)
    if (lines.length > 0) {
      result.push({ file, lines })
    }
  }

  return result
}

// Export the main service functions
module.exports = { getFormattedFiles, getFileList }
