import * as THREE from '../libs/three.js'
window.THREE = THREE

class Main {
  constructor() {

  }

  init() {
    var width = 375
    var height = 667

    var renderer = new THREE.WebGLRenderer({
      canvas
    })

    // 新建一个场景
    var scene = new THREE.Scene()

    // 新建一个正交相机
    var camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000)
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.setSize(width, height)

    var triangleShape = new THREE.Shape()
    triangleShape.moveTo(0, width / 4)
    triangleShape.lineTo(-width / 4, -width / 4)
    triangleShape.lineTo(width / 4, -width / 4)
    triangleShape.lineTo(0, width / 4)

    var geometry = new THREE.ShapeGeometry(triangleShape)
    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide
    })

    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 0
    mesh.position.y = 0
    mesh.position.z = 1
    scene.add(mesh)

    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 0

    camera.lookAt(new THREE.Vector3(0, 0, 1))

    var currentAngle = 0
    var lastTimestamp = Date.now()

    function animate() {
      var now = Date.now()
      var duration = now - lastTimestamp
      lastTimestamp = now
      currentAngle = currentAngle + duration / 1000 * Math.PI
    }

    function render() {
      animate()
      mesh.rotation.set(0, currentAngle, 0)
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }

    render()
  }
}

export default new Main()