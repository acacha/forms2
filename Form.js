import Errors from './Errors'

import axios from 'axios'

export default class Form {
  /**
  * Constructor.
  */
  constructor (originalFields) {
    this.fields = originalFields

    for (let field in originalFields) {
      this[field] = originalFields[field]
    }

    this.errors = new Errors()
  }

  /**
  *
  */
  reset () {
    this.fields = {}

    for (let field in this.fields) {
      this[field] = ''
    }

    this.errors.clear()
  }

  data () {
    let data = {}

    for (let field in this.fields) {
      data[field] = this[field]
    }

    return data
  }

    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     */
  post (url) {
    return this.submit('post', url)
  }

    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
  put (url) {
    return this.submit('put', url)
  }

    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
  patch (url) {
    return this.submit('patch', url)
  }

    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     */
  delete (url) {
    return this.submit('delete', url)
  }

  submit (requesType, url) {
    return new Promise((resolve, reject) => {
      console.log('Submitting!!')
      console.log(this.data())
      axios[requesType](url, this.data())
          .then(response => {
            this.onSuccess(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response.data)
            this.onFail(error.response.data)
            reject(error)
          })
    })
  }

  onSuccess (data) {
    this.reset()
  }

  onFail (errors) {
    this.errors.record(errors)
  }
}
