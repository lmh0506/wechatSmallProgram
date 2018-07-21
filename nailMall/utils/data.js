// 轮播图的数据图片
const URL = 'http://ojk4698oq.bkt.clouddn.com'
function getBannerData() {
  return [
    URL + '/banner_01.png',
    URL + '/banner_02.png',
    URL + '/banner_03.png',
    URL + '/banner_04.png'
  ]
}

//导航数据
function getIndexNavData() {
  return [
    {
      id: 1,
      icon: '../../images/nav_icon_01.png',
      title: '推荐'
    },
    {
      id: 2,
      icon: '../../images/nav_icon_02.png',
      title: '美甲'
    },
    {
      id: 3,
      icon: '../../images/nav_icon_03.png',
      title: '美容'
    },
    {
      id: 4,
      icon: '../../images/nav_icon_04.png',
      title: '美发'
    },
    {
      id: 5,
      icon: '../../images/nav_icon_05.png',
      title: '美睫'
    }
  ]
}

// list列表
function getIndexNavSectionData() {
  return [

    [


      {

        subject: "睫毛稀疏 种睫毛来帮忙",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_02.png",
        price: "￥100",
        message: '先的企业级云服务商,致力于打造以数据为核心的场景化 PaaS服务'

      },

      {

        subject: "爱丽克EircParisSalon",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_03.png",
        price: "￥1150",
        message: '的PaaS云服务.七牛存储 七牛云为企业提供对象存储服'

      },

      {

        subject: "伊本造型",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_04.png",
        price: "￥1047",
        message: '伊本造型是由著名形象设计师杨进先生创办。'

      },
      {

        subject: "秋季自然特价美甲",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_01.png",
        price: "￥187",
        message: '我们最求得是没有最长的时间特价'

      },

      {

        subject: "画对了妆，微微一笑颜值倍儿高！",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_05.png",
        price: "￥87",
        message: '《微微一笑很倾城》的剧照简直美腻到不要不要的'

      }

    ],
    [
      {

        subject: "秋季自然特价美甲",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_01.png",
        price: "￥187",
        message: '我们最求得是没有最长的时间特价'

      },

      {

        subject: "睫毛稀疏 种睫毛来帮忙",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_02.png",
        price: "￥100",
        message: '先的企业级云服务商,致力于打造以数据为核心的场景化 PaaS服务'

      },

      {

        subject: "爱丽克EircParisSalon",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_03.png",
        price: "￥1150",
        message: '的PaaS云服务.七牛存储 七牛云为企业提供对象存储服'

      },
      {

        subject: "画对了妆，微微一笑颜值倍儿高！",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_05.png",
        price: "￥87",
        message: '《微微一笑很倾城》的剧照简直美腻到不要不要的'

      }


    ],
    [
      {

        subject: "秋季自然特价美甲",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_01.png",
        price: "￥187",
        message: '我们最求得是没有最长的时间特价'

      },

      {

        subject: "睫毛稀疏 种睫毛来帮忙",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_02.png",
        price: "￥100",
        message: '先的企业级云服务商,致力于打造以数据为核心的场景化 PaaS服务'

      },

      {

        subject: "爱丽克EircParisSalon",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_03.png",
        price: "￥1150",
        message: '的PaaS云服务.七牛存储 七牛云为企业提供对象存储服'

      }

    ],
    [
      {

        subject: "秋季自然特价美甲",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_01.png",
        price: "￥187",
        message: '我们最求得是没有最长的时间特价'

      },

      {

        subject: "睫毛稀疏 种睫毛来帮忙",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_02.png",
        price: "￥100",
        message: '先的企业级云服务商,致力于打造以数据为核心的场景化 PaaS服务'

      }

    ],
    [
      {

        subject: "睫毛稀疏 种睫毛来帮忙",
        civerpath: "http://ojk4698oq.bkt.clouddn.com/recommend_img_02.png",
        price: "￥100",
        message: '先的企业级云服务商,致力于打造以数据为核心的场景化 PaaS服务'

      }
    ]

  ]
}

// 技师
function getSkillData() {
  return [
    {
      company: "贵阳美容美发有限公司",
      avatar: "http://ojk4698oq.bkt.clouddn.com/skilledt_img_01.png",
      nickname: '张技师',
      price: "￥500",
      message: "从事美发行有40余年，有丰富的经验,淑娴上手",
    },
    {
      company: "贵阳美容美发有限公司",
      avatar: "http://ojk4698oq.bkt.clouddn.com/skilledt_img_02.png",
      nickname: '张技师',
      price: "￥500",
      message: "从事美发行有40余年，有丰富的经验,淑娴上手",
    },
    {
      company: "贵阳美容美发有限公司",
      avatar: "http://ojk4698oq.bkt.clouddn.com/skilledt_img_03.png",
      nickname: '张技师',
      price: "￥500",
      message: "从事美发行有40余年，有丰富的经验,淑娴上手",
    },
    {
      company: "贵阳美容美发有限公司",
      avatar: "http://ojk4698oq.bkt.clouddn.com/skilledt_img_04.png",
      nickname: '张技师',
      price: "￥500",
      message: "从事美发行有40余年，有丰富的经验,淑娴上手",
    },
    {
      company: "贵阳美容美发有限公司",
      avatar: "http://ojk4698oq.bkt.clouddn.com/skilledt_img_01.png",
      nickname: '张技师',
      price: "￥500",
      message: "从事美发行有40余年，有丰富的经验,淑娴上手",
    },
    {
      company: "贵阳美容美发有限公司",
      avatar: "http://ojk4698oq.bkt.clouddn.com/skilledt_img_03.png",
      nickname: '张技师',
      price: "￥500",
      message: "从事美发行有40余年，有丰富的经验,淑娴上手",
    }

  ]
}

module.exports = {
  getBannerData,
  getIndexNavData,
  getIndexNavSectionData,
  getSkillData
}
