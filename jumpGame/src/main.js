import * as THREE from '../libs/three.js'
window.THREE = THREE
import game from './game/game'

/**
 * 游戏主函数
 */
class Main {
  constructor() {

  }

  static init() {
    game.init()
  }
}

export default Main