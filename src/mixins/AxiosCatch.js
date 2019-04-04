export const AxiosCatchMixin = {
  methods: {
    AxiosCatch (Err) {
      this.$q.notify(Err.response.data.error.message)
    }
  }
}
