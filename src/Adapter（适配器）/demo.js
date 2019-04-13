//小游戏的运行环境在iOS上是JavaScriptCore，在Android上是V8，都是没有BOM和DOM的运行环境，没有全局document和window对象。因此当你在小游戏环境下希望使用DOM API来创建Canvas和Image等元素的时候，会引发错误。
const canvas = document.createElement('canvas')	//erro


//但是我们可以使用 wx.createCanvas 和 wx.createImage 来封装一个 document。
const document = {
  createElement(tagName) {
    tagName = tagName.toLowerCase()
    if (tagName === 'canvas') {
      return wx.createCanvas()
    } else if (tagName === 'image') {
      return wx.createImage()
    }
  }
}

//这时代码就可以像在浏览器中创建元素一样创建 Canvas 和 Image 了。
const canvas = document.createElement('canvas')
const image = document.createImage('image')