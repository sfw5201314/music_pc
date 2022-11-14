export const changeTime = (time: number): string => {
  let minutes: string | number = Math.floor(time / 60)
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  let seconds: number | string = Math.floor(time % 60)
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  let allTime = '' + minutes + '' + ':' + '' + seconds + ''
  return allTime
}
