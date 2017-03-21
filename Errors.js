export default class Errors {  /**
   * Constructor.
   */
  constructor () {
    this.errors = {}
  }

  /**
   * Determine if we have any errors
   */
  any () {
    return Object.keys(this.errors).length > 0
  }

  // API
  has (field) {
    // Undescore | Lodash
    return this.errors.hasOwnProperty(field)
  }

  /**
   * Retrieve the error message for a field.
   *
   * @param field
   * @returns {*}
   */
  get (field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  /**
   * Retrieve all error messages for a field.
   *
   * @param field
   * @returns {*}
   */
  getAllErrors (field) {
    if (this.errors[field]) {
      return this.errors[field]
    }
  }

  /**
   * Record the new errors
   * @param errors
   */
  record (errors) {
    this.errors = errors
  }

  /**
   * Clear one or all error fields.
   *
   * @param {string|null} field
   */
  clear (field) {
    if (field) {
      delete this.errors[field]

      return
    }

    this.errors = {}
  }
}
