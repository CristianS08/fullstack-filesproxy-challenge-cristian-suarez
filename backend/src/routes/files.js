const express = require('express')
const { getFilesData, getFilesList } = require('../controllers/filesController')

const router = express.Router()

router.get('/data', getFilesData)
router.get('/list', getFilesList)

module.exports = router
