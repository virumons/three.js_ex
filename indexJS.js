import * as THREE from 'three';
import { PointLight } from 'three';
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// scene build as a set or a background/playground
const scene = new THREE.Scene();

// creating the torus shape
// radius - Radius of the torus. Default is 1.
// tube — Radius of the tube. Default is 0.4.
// tubularSegments — Default is 64.
// radialSegments — Default is 8.
// p — This value determines, 
// how many times the geometry winds around its axis of rotational symmetry. 
// q — This value determines, 
// how many times the geometry winds around a circle in the interior of the torus. 

const geometry = new THREE.SphereGeometry(4,64,64) 
// const geometry = new THREE.TorusKnotGeometry( 5, 1, 100, 50,2,5 )

// adding the colors to geomerty shapes as material => object is created 
const Material = new THREE.MeshStandardMaterial({
    color:"#c96a3a",
})

// adding the geomerty and the material to combine it and make a mesh object with shape and color
const Mesh = new THREE.Mesh(geometry,Material)
// adding the object to webpage
scene.add(Mesh)

// lights
const light = new PointLight(0xffffff,200,100)
light.position.set(1,10,10)
scene.add(light)

// sizes taking the sizes of brower and intializing 
const sizes={
    width: window.innerWidth,
    height:window.innerHeight,

}

// camera adding
// set to 45 as it act like len it will lead to distortion the aspect ratio is set as 800 and 600
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z=25
scene.add(camera)

// renderer : render the file to display
const canvas = document.querySelector(".hero")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)
renderer.setPixelRatio(2)

// resizing responsive
window.addEventListener("resize",()=>{
    // updating the sizes and making it responsive
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight
    // upadte camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width/sizes.height
    renderer.setSize(sizes.width,sizes.height)
})
// the above code make it responsive but not for object or model
// controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed=4

const loop=()=>{
    // Mesh.rotation.x +=0.2
    // Mesh.position.x +=0.1
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()





