<template>
  <div class="ta-progress" :class="customClass" :style="{height: thickness + 'px'}">
    <div v-if="type === 'line'" class="ta-progress-bar">
      <div class="ta-progress-bar__outer">
        <div class="ta-progress-bar__inner" :class="[{'ta-progress-bar__striped': striped}]" :style="{width:percentage+'%',backgroundColor: trackColor}">
          <div v-if="textPosition==='inside'" class="ta-progress-bar__innerText"><slot>{{ percentage }}</slot></div>
        </div>
      </div>
      <div v-if="textPosition==='outside'" class="ta-progress-bar__innerText margin-left"><slot>{{ percentage }}%</slot></div>
    </div>
  </div></template>

<script>
export default {
  name: 'TaProgress',
  componentName: 'TaProgress',
  props: {
    type: {
      type: String,
      default: 'line'
    },
    value: {
      type: [Number, String],
      default: 0,
      required: true,
      validator: val => {
        return val >= 0 && val <= 100
      }
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    customClass: {
      type: String,
      default () {
        return ''
      }
    },
    striped: {
      type: Boolean,
      default: false
    },
    thickness: {
      type: [Number, String],
      default: 24
    },
    trackColor: {
      type: String,
      default () {
        return this.type === 'line' ? '#20a0ff' : '#e5e9f2'
      }
    },
    textPosition: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      barWidth: ''
    }
  },
  computed: {
    percentage() {
      return parseInt(this.value * 100 / this.max, 10)
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@progressHeight:20px;
.ta-progress{
  position: relative;
  width: 100%;
  height: @progressHeight;
  border-radius:10px;
}
.ta-progress-bar{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: inherit;
}
.ta-progress-bar__outer{
  flex: 1;
  margin-left:5px;
  height: inherit;
  background-color: #ccc;
  border-radius: 10px;
}
.ta-progress-bar__inner{
  height: inherit;
  background:linear-gradient(160deg,rgba(100,236,206,1) 0%,rgba(94,206,224,1) 54%,rgba(43,135,218,1) 100%);
  border-radius: 10px;
  transition: width 1s linear;
}
.ta-progress-bar__innerText{
  font-size: .24rem;
  text-align: center;
}

.ta-progress-bar__striped {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .35) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
  animation: progress-bar-stripes 2s linear infinite
}
.margin-left{
  margin-left: 5px;
}
@keyframes progress-bar-stripes {
  from {
  background-position: 40px 0
  }

  to {
  background-position: 0 0
  }
}
</style>
