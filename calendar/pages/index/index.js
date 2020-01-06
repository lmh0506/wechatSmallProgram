//index.js
Page({
  data: {
    currentYearMonth: '',
    weekList: ['日', '一', '二', '三', '四', '五', '六'],
    calendarList: [],
    scrollToId: '',
    nowDateTime: '',
    activeDateTime: [],
    isShowMask: false,
    detail: {}
  },
  onLoad () {
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth() + 1
    let currentDay = currentDate.getDate()

    let activeDateTime = []
    let dateTimeList = ['2020-02-02', '2019-03-03']
    let days = [30, 100, 200, 300, 1000]
    // 计算相关的日期
    for(let i = 0; i < dateTimeList.length; i++) {
      for(let j = 0; j < days.length; j++) {
        let date = new Date(new Date(dateTimeList[i]).getTime() + days[j] * 24 * 60 * 60 * 1000)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        activeDateTime.push({
          dateContent: dateTimeList[i],
          date: `${year}${month}${day}`
        })
      }
    }

    this.setData({
      currentYearMonth: `${currentYear}年${currentMonth}月`,
      nowDateTime: `${currentYear}${currentMonth}${currentDay}`,
      activeDateTime,
      dateTimeList
    })

    this.initCalendarList()
  },
  onUnload() {
    this._observer && this._observer.disconnect()
  },
  // 监听月份是否全部显示
  observeMonth() {
    this._observer && this._observer.disconnect()
    this._observer = this.createIntersectionObserver({
      thresholds: [1],
      observeAll: true
    })
    this._observer.relativeTo('.calendar-list').observe('.monthday-wrapper', res => {
      if(res.intersectionRatio === 1) {
        this.setData({
          currentYearMonth: res.dataset.yearmonth
        })
      }
    })
  },
  // 初始化日历
  initCalendarList() {
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth()

    let calendarList = this.getCalendarList(currentYear, currentMonth)

    this.setData({
      calendarList
    })
    this.unshiftCalendar()
    
  },
  // 向后添加日期
  addCalendar() {
    let {year, month} = this.data.calendarList[this.data.calendarList.length - 1]
    this.setData({
      calendarList: this.data.calendarList.concat(this.getCalendarList(year, month))
    })
    // 列表变化后需要重新计算dom
    this.observeMonth()
  },
  // 向前添加日期
  unshiftCalendar() {
    let {year, month} = this.data.calendarList[0]
    this.setData({
      calendarList: this.getCalendarList(year, month, 10, true).reverse().concat(this.data.calendarList),
      scrollToId: `calendar_${year}_${month}`
    })
    // 列表变化后需要重新计算dom
    this.observeMonth()

  },
  // 获取日历列表
  getCalendarList(startYear, startMonth, count = 10, isUnshift = false) {
    let calendarList = []
    // 判断是向前还是向后添加
    let len = isUnshift ? startMonth - count : startMonth + count

    for(let i = isUnshift ? startMonth - 2 : startMonth; isUnshift ? i > len : i < len; isUnshift ? i-- : i++) {
      // 获取这个月的总天数
      let dateLength = new Date(startYear, i + 1, 0).getDate()

      let monthDate = new Date(startYear, i)
      let year = monthDate.getFullYear()
      let month = monthDate.getMonth() + 1
      
      let yearMonth = `${year}年${month}月`
      let calendar = {
        yearMonth,
        year,
        month
      }
      let dayList = []

      for(let j = 1; j < dateLength + 1; j++) {
        let date = new Date(startYear, i, j)

        let weekday = date.getDay()
        let day = date.getDate()
        let datetime = `${year}${month}${day}`
        
        let activeList = []
        let activeDateTime = this.data.activeDateTime
        let dateTimeList = this.data.dateTimeList
        // 判断当前日期是否在需要高亮的日期内
        for(let k = 0; k < activeDateTime.length; k++) {
          let {date, dateContent} = activeDateTime[k]
          if(date === datetime) {
            activeList.push(dateContent)
          }
        }

        for(let n = 0; n < dateTimeList.length; n++) {
          let [timeYear, timeMonth, timeDay] = dateTimeList[n].split('-')

          if(parseInt(timeMonth) === month && parseInt(timeDay) === day && year > timeYear) {
            activeList.push(year - timeYear)
          }
        }
        
        dayList.push({
          date,
          month,
          year,
          weekday,
          day,
          datetime,
          activeList,
          isActive: activeList.length > 0
        })
      }
      calendar.dayList = dayList
      calendarList.push(calendar)
    }
    return calendarList
  },
  showDetail(e) {
    let contentList = e.currentTarget.dataset.contentlist

    if(contentList.length > 0) {
      this.setData({
        detail: contentList,
        isShowMask: true
      })
    }
  },
  hideMask() {
    this.setData({
      isShowMask: false
    })
  }
})
