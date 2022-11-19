<template>
  <div class="bg-blur">
    <div id="player">
      <audio
        :src="musicUrl"
        ref="playRef"
        autoplay
        @ended="musicOver"
        @timeupdate="onTimeupdate"
        @canplay="changeDuration"
      ></audio>
      <!-- 控制模块 -->
      <div id="player-content2">
        <!-- 右侧歌曲操作模块 -->
        <div class="player-controls">
          <!-- 上一首按钮 -->
          <div class="btn prev iconfont" @click="outBtn">&#xe603;</div>
          <!-- 暂停/播放 按钮 -->
          <div
            v-show="musicList?.length !== 0"
            class="btn play-pause iconfont"
            :class="isPlay ? 'icon-24gf-playCircle' : 'icon-24gf-pauseCircle'"
            @click="play"
          ></div>
          <div
            v-show="musicList?.length == 0"
            class="btn play-pause iconfont"
            :class="{ 'icon-24gf-playCircle': musicList?.length == 0 }"
            @click="play"
          ></div>
          <!-- 下一首按钮 -->
          <div class="btn next iconfont" @click="next">&#xe602;</div>
        </div>
        <div id="player-content1">
          <div class="time">
            <!-- 当前播放的时间 -->
            <div class="current-time"></div>
            <!-- 歌曲总时长 -->
            <div class="total-time"></div>
          </div>
          <!-- 进度条 -->
          <div class="slider_box">
            <el-slider
              v-model="playTime"
              :show-tooltip="false"
              size="small"
              :max="sliderLength"
              @change="changePlayTime"
            />
            <div class="music_time">
              <span>
                {{ nowTime ? nowTime : '00:00' }} /
                {{ countTime ? countTime : '00:00' }}
              </span>
              <div class="icon_box">
                <div @click="voiceButtonClick">
                  <span class="iconfont" v-if="!voiceMute">&#xe6c0;</span>
                  <span class="iconfont" v-else>&#xe6bf;</span>
                </div>
                <div class="voice_slider">
                  <div class="slider_voice">
                    <el-slider
                      v-model="voicePower"
                      :show-tooltip="false"
                      vertical
                      height="100px"
                      size="small"
                      :max="1"
                      :step="0.01"
                      @change="changeVoicePower"
                    />
                  </div>
                  <div>{{ Math.floor(voicePower * 100) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUpdate, onMounted, ref, watch } from 'vue'
import { musicStore } from '@/stores/music'
import { changeTime } from '@/utils/changeDay'

const emits = defineEmits(['musicDetail'])

const musicList = ref<Array<any>>([])
const musicDetailList = ref<Array<any>>([])
const musicUrl = ref<string>()
const store = musicStore()

let isPlay = ref<boolean>(true)
const playRef = ref<any>()
//现在的播放时间
const playTime = ref<number>(0.0)

//歌曲的时间长度
const playDuration = ref<number>(0.0)

//进度条长度
const sliderLength = ref<number>(100)

//总时间
const countTime = ref<number | string>()

//当前时间
const nowTime = ref<number | string>()

//是否静音
const voiceMute = ref<boolean>(false)

//音量大小
const voicePower = ref<number>(0)

//控制src
const musicCursor = ref<number>(0)

onMounted(() => {
  voicePower.value = playRef.value.volume
  //播放状态下，使播放进度自增1，以与Audio内置的currentTime相匹配
  setInterval(updatePlayTimePerSecond, 1000)
})

onBeforeUpdate(() => {
  // console.log('组件更新前', playRef.value.paused)
  // console.log(playRef.value?.duration)
  if (musicList.value?.length === 0) {
    playTime.value = 0.0
  }
  if (playRef.value?.paused === false) {
    isPlay.value = false
  } else {
    isPlay.value = true
  }
})

watch(store, (newValue, oldValue) => {
  // console.log('watch 已触发', 'new', newValue.$state, 'old', oldValue.$state)
  musicList.value = [...new Set(newValue.$state.musicArrUrl)]
  musicDetailList.value = [...new Set(newValue.$state.musicDetailArr)]
  musicUrl.value = musicList.value?.[0]
  playTime.value = 0.0
  isPlay.value = false
  // console.log('🚀', musicDetailList.value)
})
const play = async () => {
  isPlay.value = !isPlay.value
  if (isPlay.value == false) {
    await playRef.value.play()
  } else if (isPlay.value == true) {
    // audio?.pause()
    await playRef.value.pause()
  }
}

//播放完毕的回调
const musicOver = () => {
  console.log('播放完毕了', musicCursor.value)
  playTime.value = 0.0
  nowTime.value = ''
  isPlay.value = true
  playRef.value.play()
}

const changeNum = ref<number>(0)
const changeMuisc = () => {}
//上一首
const outBtn = () => {
  if (musicList.value?.length >= 2) {
    musicCursor.value--
    if (musicCursor.value < 0) return (musicCursor.value = 0)
    playTime.value = 0.0
    musicUrl.value = musicList.value?.[musicCursor.value]
    //将歌曲信息发送给控制器父组件
    emits('musicDetail', musicDetailList.value[musicCursor.value])
  }
}

//下一首
const next = () => {
  if (
    musicCursor.value !== musicList.value?.length - 1 &&
    musicList.value?.length > 1
  ) {
    musicCursor.value++
    playTime.value = 0.0
    musicUrl.value = musicList.value?.[musicCursor.value]
    //将歌曲信息发送给控制器父组件
    emits('musicDetail', musicDetailList.value[musicCursor.value])
  }
  // else {
  //   playTime.value = 0.0
  //   isPlay.value = true
  // }
}

//时间改变时
const onTimeupdate = () => {
  nowTime.value = changeTime(playRef.value?.currentTime)
}
//slider改变的回调函数
const changePlayTime = (val: any) => {
  // console.log('拖动', val)
  //把当前拖动的时间赋值给currentTime
  playRef.value.currentTime = val
}
//audio的canplay事件，当歌曲全部加载完毕才能获取总时间
const changeDuration = () => {
  countTime.value = changeTime(playRef.value?.duration)
  if (playDuration.value !== playRef.value?.duration) {
    //修改进度条的最大值
    sliderLength.value = playRef.value?.duration
    //修改歌曲播放时间
    playDuration.value = playRef.value?.duration
  }
}
//播放状态下，进度条里的数值每秒递增。而Audio因为在播放状态下，currentTime会自己递增，所以不用处理
const updatePlayTimePerSecond = () => {
  //如果是播放状态则进度条每秒+1
  if (!playRef.value?.paused) {
    playTime.value += 1
  }
}
//音量按钮点击回调
const voiceButtonClick = () => {
  voiceMute.value = !voiceMute.value
  if (!voiceMute.value) {
    voicePower.value = 1
    playRef.value.volume = 1
  } else {
    voicePower.value = 0
    playRef.value.volume = 0
  }
}
//el-slider的钩子函数，用于调节音量
const changeVoicePower = (val: any) => {
  playRef.value.volume = val
  voicePower.value = val
}
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#player {
  width: 800px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 歌曲信息模块 */
#player-content1 {
  width: 600px;
  height: 65px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* transition过渡动画：设置top属性过渡，过渡时间0.3s,速度曲线为ease(逐渐变慢) */
  transition: top 0.3s ease;
}

.time {
  font-size: 12px;
  margin-top: 20px;
}

.current-time {
  float: left;
}

.total-time {
  float: right;
}

.current-time,
.total-time {
  font-size: 11px;
  border-radius: 10px;
  transition: 0.3s ease all;
}

#player-content2 {
  align-items: inherit;
  width: 100%;
  height: 70px;
  display: flex;
  background: #fff;
  border-radius: 20px;
}

.player-controls {
  padding: 10px;
}

.player-controls .btn {
  float: left;
  width: 30px;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #d6dee7;
}

.btn {
  cursor: pointer;
}

:deep(.el-slider__button) {
  display: none;
  width: 11px;
  height: 11px;
}
:deep(.el-slider):hover .el-slider__button {
  display: inline-block;
}

.slider_box {
  display: flex;
  align-items: center;
}
.music_time {
  font-size: 12px;
  white-space: nowrap;
  margin-left: 15px;
  display: flex;
  align-items: center;
}

.icon_box {
  height: 26px;
  width: 50px;
  position: relative;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  .voice_icon {
    width: 20px !important;
    height: 20px !important;
    cursor: pointer;
  }
  .voice_slider {
    display: none;
    height: 150px;
    position: absolute;
    // bottom: 25px;
    bottom: 35px;
    left: 5px;
    text-align: center;
    border: 1px solid #e5e7eb;
    background-color: white;
    border-radius: 15px;
    .slider_voice {
      margin-top: 15px;
    }
  }
}
.icon_box:hover .voice_slider {
  display: block;
}
.voice_slider::before {
  content: '';
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-top: 10px solid #e5e7eb;
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
