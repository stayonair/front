export default {
  methods: {
    /**
     * @param dataKey
     * @return {boolean}
     */
    errorContains(dataKey = 'errors') {
      if (!this[dataKey]) {
        return false
      }
      if (typeof this[dataKey] === 'object') {
        return !!this[dataKey].length
      }
      return !!this[dataKey]
    }
  }
}
