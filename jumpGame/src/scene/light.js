class Light{
  constructor() {
    this.instances = {}
  }

  init() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    // 平行光
    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.3)
    this.shadowLight = shadowLight
    shadowLight.position.set(10, 30, 20)
    shadowLight.castShadow = true
    // 设置平行光方向
    let basicMaterial = new THREE.MeshBasicMaterial({color: 0xf5f5f5})
    this.shadowTarget = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), basicMaterial)

    this.shadowTarget.visible = false
    this.shadowTarget.name = 'shadowTarget'
    shadowLight.target = this.shadowTarget
    shadowLight.shadow.camera.near = 0.5
    shadowLight.shadow.camera.far = 500
    shadowLight.shadow.camera.left = -100
    shadowLight.shadow.camera.right = 100
    shadowLight.shadow.camera.top = 100
    shadowLight.shadow.camera.bottom = -100
    shadowLight.shadow.mapSize.width = 1024
    shadowLight.shadow.mapSize.height = 1024

    this.instances.ambientLight = ambientLight
    this.instances.shadowLight = shadowLight
    this.instances.shadowTarget = this.shadowTarget

  }
}

export default new Light()
