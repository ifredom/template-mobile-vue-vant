import baseURL from '../api'
import { TokenKey } from '../utils/auth'

// 常量文件
export default {
  cookieName: TokenKey,
  pageCurrent: 1,
  pageLimit: 10,
  effectiveDate: new Date(),
  expiredDate: new Date('2099-12-31 00:00:00'),
  upLoadUrl: baseURL + '/upload?appId=WEB_CLIENT&timeStamp=',
  fileUrl: 'http://ifredom.oss-cn-beijing.aliyuncs.com/',
  OSSConfig: {
    region: 'oss-cn-beijing',
    accessKeyId: 'AIB2JFIH5MO3',
    accessKeySecret: 'sau57a6keroPJCeiS',
    bucket: 'ifredom'
  },
  amountRange: [{
    name: '0元----100元',
    value: [0, 10000]
  },
  {
    name: '101元----500元',
    value: [10100, 50000]
  },
  {
    name: '501元----1000元',
    value: [50100, 100000]
  },
  {
    name: '1001元----9999元',
    value: [100100, 999900]
  },
  {
    name: '9999元以上',
    value: [999900, 100000000]
  }
  ],
  dayRange: [{
    name: '0天----10天',
    value: [0, 10]
  },
  {
    name: '10天----20天',
    value: [10, 20]
  },
  {
    name: '20天----30天',
    value: [20, 30]
  },
  {
    name: '30天以上',
    value: [30, 999]
  }
  ],
  pickerOptions: {
    shortcuts: [{
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一季度',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 120)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近半年',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一年',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
        picker.$emit('pick', [start, end])
      }
    }]
  },
  seasonNumList: [{
    value: 1,
    name: '一季度'
  },
  {
    value: 2,
    name: '二季度'
  },
  {
    value: 3,
    name: '三季度'
  },
  {
    value: 4,
    name: '四季度'
  }
  ],
  monthNumList: [{
    value: 1,
    name: '一月'
  },
  {
    value: 2,
    name: '二月'
  },
  {
    value: 3,
    name: '三月'
  },
  {
    value: 4,
    name: '四月'
  },
  {
    value: 5,
    name: '五月'
  },
  {
    value: 6,
    name: '六月'
  },
  {
    value: 7,
    name: '七月'
  },
  {
    value: 8,
    name: '八月'
  },
  {
    value: 9,
    name: '九月'
  },
  {
    value: 10,
    name: '十月'
  },
  {
    value: 11,
    name: '十一月'
  },
  {
    value: 12,
    name: '十二月'
  }
  ]
}
