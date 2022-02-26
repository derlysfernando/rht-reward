/* eslint-disable react/require-default-props */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PropTypes from "prop-types";
import { Container } from "./style";

function Render({
  className,
  obj,
  renderId,
  sizeX,
  sizeY,
  position,
  rotationY,
  zoom,
  classNameDiv,
  noZoom,
  clickAnimation,
  startAnim,
}) {
  let scene;
  let renderer;
  let camera;
  let model;
  let skeleton;
  let mixer;
  let clock;
  let numAnimations;
  const allActions = [];

  const baseActions = {
    idle: { weight: 1 },
    walk: { weight: 2 },
    run: { weight: 3 },
    OpenChest: { weight: 4 },
    OpeningChest: { weight: 5 },
  };

  const additiveActions = {
    sneak_pose: { weight: 0 },
    sad_pose: { weight: 0 },
    agree: { weight: 0 },
    headShake: { weight: 0 },
  };
  const [renderIdObj] = useState(renderId);
  const [actionRender, setActionStart] = useState([]);
  function resizeCanvasToDisplaySize(force) {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const container = document.getElementById(`${renderId}1`);
    if (!container) return;

    const containerStyle = getComputedStyle(container, null);
    const SCREEN_HEIGHT = parseInt(containerStyle.getPropertyValue("height"));
    const SCREEN_WIDTH = parseInt(containerStyle.getPropertyValue("width"));

    // adjust displayBuffer size to match
    if (
      force ||
      canvas.width !== SCREEN_WIDTH ||
      canvas.height !== SCREEN_HEIGHT
    ) {
      // you must pass false here or three.js sadly fights the browser
      renderer.autoClear = false;
      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT, false);
      camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
      camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }

  function resizeCanvasToDisplaySizeNoZoom(force) {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (force || canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }
  function setWeight(action, weight) {
    const actionItem = action;
    actionItem.enabled = true;

    actionItem.setEffectiveTimeScale(1);

    actionItem.setEffectiveWeight(weight);
  }

  function activateAction(action) {
    const clip = action.getClip();
    const settings = baseActions[clip.name] || additiveActions[clip.name];

    setWeight(action, settings.weight);
    action.play();
  }

  function clickStartAnimation(action) {
    const clip = action[0].getClip("OpenChest");

    const settings = baseActions.OpenChest || additiveActions[clip.name];

    setWeight(action[0], settings.weight);
    action[0].clampWhenFinished = true;
    action[0].loop = THREE.LoopOnce;
    action[0].play();
  }

  useEffect(() => {
    if (actionRender && actionRender.length > 0)
      clickStartAnimation(actionRender);
  }, [startAnim]);

  function animate() {
    // Render loop
    if (noZoom) {
      resizeCanvasToDisplaySizeNoZoom();
    } else {
      resizeCanvasToDisplaySize();
    }

    requestAnimationFrame(animate);

    for (let i = 0; i !== numAnimations; i += 1) {
      const action = allActions[i];
      const clip = action.getClip();
      const settings = baseActions[clip.name] || additiveActions[clip.name];
      settings.weight = action.getEffectiveWeight();
    }

    // Get the time elapsed since the last frame, used for mixer update

    const mixerUpdateDelta = clock.getDelta();

    mixer.update(mixerUpdateDelta);

    renderer.render(scene, camera);
  }

  function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();

    const hemiLight = new THREE.HemisphereLight(0x000000, 0x000000);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(1, 1, 1);

    const ambientLight = new THREE.AmbientLight(0xffffff);

    scene.add(pointLight, ambientLight);

    const loader = new GLTFLoader();
    loader.load(obj, (gltf) => {
      model = gltf.scene;
      model.rotation.y = rotationY;

      scene.add(model);
      model.traverse((object) => {
        const objShadow = object;
        if (objShadow.isMesh) objShadow.castShadow = true;
      });

      skeleton = new THREE.SkeletonHelper(model);
      skeleton.visible = false;
      scene.add(skeleton);

      const { animations } = gltf;
      mixer = new THREE.AnimationMixer(model);

      numAnimations = animations.length;
      for (let i = 0; i !== numAnimations; i += 1) {
        let clip = animations[i];
        const { name } = clip;
        if (baseActions[name]) {
          const action = mixer.clipAction(clip);
          if (!clickAnimation) {
            activateAction(action);
          } else {
            actionRender.push(action);
            setActionStart(actionRender);
          }

          baseActions[name].action = action;
          allActions.push(action);
        } else if (additiveActions[name]) {
          // Make the clip additive and remove the reference frame

          THREE.AnimationUtils.makeClipAdditive(clip);

          if (clip.name.endsWith("_pose")) {
            clip = THREE.AnimationUtils.subclip(clip, clip.name, 2, 3, 30);
          }

          const action = mixer.clipAction(clip);
          if (!clickAnimation) {
            activateAction(action);
          } else {
            setActionStart(action);
          }
          additiveActions[name].action = action;
          allActions.push(action);
        }
      }

      animate();
    });

    // init like this
    renderer.setClearColor(0xffffff, 0); // second param is opacity, 0 => transparent
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizeX, sizeY);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    // camera
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(-1, 2, 3);

    camera.zoom = zoom;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = 1.4;
    controls.maxPolarAngle = 1.4;
    controls.target.set(0, position || 1, 0);
    controls.update();
  }
  useEffect(() => {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: document.getElementById(renderIdObj || "canvasItem"),
    });

    init();
  }, [renderIdObj]);

  return (
    <Container className={classNameDiv}>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={className}
        id={`${`${renderId}1`}` || "container"}
      >
        <canvas id={renderIdObj || "canvasItem"} />
      </div>
    </Container>
  );
}

Render.propTypes = {
  className: PropTypes.string,
  obj: PropTypes.string,
  renderId: PropTypes.string,
  sizeX: PropTypes.number,
  sizeY: PropTypes.number,
  position: PropTypes.number,
  rotationY: PropTypes.number,
  zoom: PropTypes.number,
  classNameDiv: PropTypes.string,
  noZoom: PropTypes.string,
  clickAnimation: PropTypes.bool,
  startAnim: PropTypes.bool,
};

Render.defaultProps = {
  className: "",
  obj: "",
  renderId: "",
  sizeX: 400,
  sizeY: 200,
  position: 1,
  rotationY: 0.8,
  zoom: 0.8,
  classNameDiv: "",
  noZoom: undefined,
};

export default Render;
