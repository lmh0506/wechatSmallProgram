class GameOverPage {
  constructor(callbacks) {
    this.callbacks = callbacks
  }

  init(options) {
    console.log('game over init')
    this.initGameoverCanvas(options)
  }

  initGameoverCanvas(options) {
    
  }

  show() {
    this.obj.visible = true
    console.log('game over page show')
  }

  hide() {
    this.obj.visible = false
    console.log('game over page hide')
  }
}

export default GameOverPage
