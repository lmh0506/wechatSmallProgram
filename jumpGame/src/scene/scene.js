import camera from './camera'

class Scene {
  constructor() {
    this.instance = null
  }

  init() {
    this.instance = new THREE.Scene()
    const renderer = this.renderer = new THREE.WebGLRenderer({
      canvas,
      antilias: true, // 抗锯齿
      preserveDrawingBuffer: true // 缓存区
    })
    
    this.camera = camera
    this.camera.init()

    let width = 10

    this.axesHelper = new THREE.AxesHelper(100)
    this.instance.add(this.axesHelper)

    this.instance.add(this.camera.instance)
  }

  render() {
    this.renderer.render(this.instance, this.camera.instance)
  }
}

export default new Scene()
