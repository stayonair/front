export default {
  methods: {
    getPostedAt(postedAt) {
      const date = new Date(postedAt.replace(/-/g, '-'))
      const timeDiff = Math.floor((new Date() - date) / 3600000)
      const dateDiff = Math.floor(timeDiff / 24)

      if (dateDiff === 0) {
        // 24 時間以内の更新の場合、時間を表示する
        return `${timeDiff} hour${timeDiff > 1 ? 's' : ''} ago`
      }
      if (dateDiff > 30) {
        // 1 月以上前の更新の場合、日付を表示する
        return `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`
      }
      return `${dateDiff} day${dateDiff > 1 ? 's' : ''} ago` // 24 時間以上 1 月以内の更新の場合、何日前の更新かを表示する
    }
  }
}