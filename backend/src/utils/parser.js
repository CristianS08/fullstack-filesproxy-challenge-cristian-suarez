/**
 * Validates a CSV line by checking required fields and their formats.
 * @param {string} text - The text value.
 * @param {string} number - The number value (should be numeric).
 * @param {string} hex - The hex string (should be 32 characters).
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
function isValidCSVLine (text, number, hex) {
  if (!text) {
    console.log("Validation failed: 'text' is missing")
    return false
  }
  if (isNaN(Number(number))) {
    console.log(`Validation failed: 'number' is not numeric: ${number}`)
    return false
  }
  if (!hex || hex.trim().length !== 32) {
    console.log(`Validation failed: 'hex' is invalid: ${hex}`)
    return false
  }
  return true
}

/**
 * Parses raw CSV content, skipping the header and transforming valid lines.
 * Logs malformed lines and excludes them from the result.
 *
 * @param {string} csv - Raw CSV content as string
 * @returns {Array<Object>} Array of valid parsed entries
 */
function parseCSVContent (csv) {
  const lines = csv.trim().split('\n').slice(1) // Skip header line
  console.log(`Parsing ${lines.length} lines (excluding header)`)

  return lines
    .map((line, idx) => {
      const [, text, number, hex] = line.split(',')

      if (!isValidCSVLine(text, number, hex)) {
        console.log(`Skipping invalid line at index ${idx}: ${line}`)
        return null
      }

      return {
        text: text.trim(),
        number: Number(number),
        hex: hex.trim()
      }
    })
    .filter(Boolean) // Remove null entries
}

module.exports = {
  parseCSVContent
}
