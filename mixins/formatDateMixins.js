export default {
  methods: {
    getPostedAt(postedAt) {

      const date = Number((String(postedAt.seconds) + String(postedAt.nanoseconds)).substring(0, 13))
      const minDiff = Math.floor((new Date() - date) / 60000)
      const timeDiff = Math.floor((new Date() - date) / 3600000)
      const dateDiff = Math.floor(timeDiff / 24)

      if (timeDiff === 0) {
        // 1時間以内の更新の場合、分を表示する
        return `${minDiff} minutes ago`
      }

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