import GameOverPage from '../pages/game-over-page'
import GamePage from '../pages/game-page'

class GameView {
  constructor() {

  }

  restartGame() {
    this.gamePage.restart()
  }

  initGamePage(callbacks) {
    this.gamePage = new GamePage(callbacks)
    this.gamePage.init()
  }

  initGameOverPage(callbacks) {
    this.gameOverPage = new GameOverPage(callbacks)
    this.gameOverPage.init({
      scene: this.gamePage.scene
    })
  }

  showGameOverPage() {
    this.gamePage.hide()
    this.gameOverPage.show()
  }

  showGamePage() {
    this.gameOverPage.hide()
    this.gamePage.restart()
    this.gamePage.show()
  }
}

export default new GameView()
