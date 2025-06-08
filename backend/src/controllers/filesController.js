const { getFormattedFiles, getFileList } = require('../services/fileService')

const getFilesData = async (req, res) => {
  try {
    const data = await getFormattedFiles(req.query.fileName)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getFilesList = async (req, res) => {
  try {
    const list = await getFileList()
    res.status(200).json(list)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getFilesData, getFilesList }
