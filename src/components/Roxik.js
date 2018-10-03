import React, { Component } from 'react';
import CameraController from './CameraController';
import MotionController from './MotionController';
import * as THREE from 'three';

export default class Roxik extends React.Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.models = [];

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  /**
   * Rendering
   */
  render() {
    return (
      <div className='three' ref={(el) => { this.three = el }}></div>
    );
  }

  /**
   * Initialization
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.initialize();
    this.animate();
  }

  initialize() {
    this.initializeEngine();
    this.initializeCamera();
    this.initializeLights();
    this.initializeMaterials();
    this.initializeObjects();
    this.initializeFilters();
    this.initializeListeners();
  }

  initializeEngine() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfefefe);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.three.appendChild(this.renderer.domElement);
  }

  initializeCamera() {
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.001, 1000);

    this.camera.position.x = 2;
    this.camera.position.y = 2;
    this.camera.position.z = -2;

    this.cameraController = new CameraController();
    this.cameraController.camera = this.camera;
  }

  initializeLights() {
    this.ambientLight = new THREE.DirectionalLight(0x9090aa);
    this.ambientLight.position.set(-10, 10, -10).normalize();
    this.scene.add(this.ambientLight);

    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  }

  initializeMaterials() {
    const colors = [0x97350b, 0x266ea5, 0x00847f, 0x2f818e, 0x08917c, 0x08917c, 0x6b458c, 0x7a4526];
    const ambient = [0xff6109, 0x4ebeff, 0x05edec, 0x5deeff, 0x0cffe7, 0xe67ae4, 0xb476ea, 0xf78849];
    this.sphereMaterial = [];

    for (var i = 0; i < 8; i++) {
      let mat = new THREE.MeshLambertMaterial({ color: colors[i] });
      this.sphereMaterial.push(mat);
    }

    this.cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });
    this.cubeMaterial.wireframe = true;
  }

  initializeObjects() {
    const bet = 0.7;
    const offset = (((8 - 1) * bet) * 0.5);

    let geometry = new THREE.IcosahedronBufferGeometry(0.3, 2);

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        for (var k = 0; k < 8; k++) {
          let m = this.sphereMaterial[Math.floor(Math.random() * 8)];
          let s = new THREE.Mesh(geometry, m);
          s.position.set(((i * bet) - offset), ((j * bet) - offset), ((k * bet) - offset));

          this.models.push(s);
          this.scene.add(s);
        }
      }
    }

    this.cube = new THREE.CubeGeometry(18, 18, 18, 4, 4, 4);
    this.cubeMesh = new THREE.Mesh(this.cube, this.cubeMaterial);
    this.scene.add(this.cubeMesh);

    this.cameraController.models = this.models;

    this.motionController = new MotionController();
    this.motionController.models = this.models;
    this.motionController.changeScene(this.motionController.CYLINDER);
  }

  initializeFilters() {
  }

  initializeListeners() {
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.cameraController.step();
    this.motionController.step();

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Resize operation handler, updating dimensions.
   * Setting state will invalidate the component 
   * and call `componentWillUpdate()`.
   */
  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  /**
   * Invalidation handler, updating layout
   */
  componentWillUpdate() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Dipose
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

}
