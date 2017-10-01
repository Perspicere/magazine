
// import mainImg from '../../resources/journalOne/卷首语/1.jpg'


const config = {
  title: '变迁',
  description: '日新月异的城市，逐渐失控的未来。。。',
  welcome: '欢迎来到第一期，变迁',
  mainImg: require('../../resources/journalOne/卷首语/1.jpg'), // 卷首图片

  contents: [
    {
      name: '心智',
      items: [
        {
          title: '工厂女孩',
          description: `
            视界工厂的面纱下，是一个个鲜活劳作与生活的年轻人，奔走在城乡
            之间。他们的悲欢和命运被发展紧紧的绑定。
          `,
          author: '张彤禾',
          time: '12分钟',
          img: require('../../resources/journalOne/心智/1/1.jpg'),
        },
        {
          title: '工厂女孩',
          description: `
            视界工厂的面纱下，是一个个鲜活劳作与生活的年轻人，奔走在城乡
            之间。他们的悲欢和命运被发展紧紧的绑定。
          `,
          author: '张彤禾',
          time: '12分钟',
        },
      ],
    },
    {
      name: '此岸',
      items: [
        {
          title: '工厂女孩',
          description: `
            视界工厂的面纱下，是一个个鲜活劳作与生活的年轻人，奔走在城乡
            之间。他们的悲欢和命运被发展紧紧的绑定。
          `,
          author: '张彤禾',
          time: '12分钟',
        },
      ],
    },
  ],

}

export default () => config
