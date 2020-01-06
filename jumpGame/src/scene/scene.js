import camera from './camera'
import Light from './light'
import Background from '../objects/background'

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

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    
    this.camera = camera
    this.camera.init()

    this.light = Light
    this.light.init()

    let width = 10

    this.axesHelper = new THREE.AxesHelper(100)
    this.instance.add(this.axesHelper)

    this.instance.add(this.camera.instance)

    // 将光线添加到场景中
    for(let lightType in this.light.instances) {
      this.instance.add(this.light.instances[lightType])
    }

    this.background = Background
    this.background.init()
    this.background.instance.position.z = -84
    this.camera.instance.add(this.background.instance)
  }

  render() {
    this.renderer.render(this.instance, this.camera.instance)
  }
}

export default new Scene()
