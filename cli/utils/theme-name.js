/**
 * Check if theme name is valid
 * @param {string} themeName 
 * @returns {boolean}
 */
export function isValidThemeName(themeName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    themeName
  )
}

/**
 * Convert an invalid theme name to valid
 * @param {string} themeName 
 * @returns {string}
 */
export function toValidThemeName(themeName) {
  return themeName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}