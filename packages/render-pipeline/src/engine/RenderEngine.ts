import * as THREE from 'three';
import { IsometricCameraController } from '../camera/IsometricCameraController';
import { ProceduralCityscape } from '../city/ProceduralCityscape';
import { DayNightLighting } from '../lighting/DayNightLighting';
import { OfficeInterior } from '../office/OfficeInterior';

export type ViewMode = 'CITY' | 'HQ_OFFICE';

export class RenderEngine {
  public scene: THREE.Scene;
  public renderer: THREE.WebGLRenderer;
  public cameraController: IsometricCameraController;
  public lighting: DayNightLighting;
  public city: ProceduralCityscape;
  public office: OfficeInterior;

  public viewMode: ViewMode = 'HQ_OFFICE';
  private isRunning: boolean = false;
  private lastTime: number = 0;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0c12);
    this.scene.fog = new THREE.FogExp2(0x0a0c12, 0.012);

    const width = container.clientWidth || window.innerWidth || 1280;
    const height = container.clientHeight || window.innerHeight || 720;
    const aspect = width / height;

    this.cameraController = new IsometricCameraController(aspect);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    const dom = this.renderer.domElement;
    dom.style.position = 'absolute';
    dom.style.top = '0';
    dom.style.left = '0';
    dom.style.width = '100%';
    dom.style.height = '100%';
    dom.style.display = 'block';
    dom.style.zIndex = '0';

    container.appendChild(dom);

    this.lighting = new DayNightLighting(this.scene);
    this.city = new ProceduralCityscape();
    this.office = new OfficeInterior();

    this.scene.add(this.city.group);
    this.scene.add(this.office.group);

    this.setupEventListeners();
    this.setViewMode('HQ_OFFICE');

    // Force an immediate layout update after frame
    requestAnimationFrame(() => {
      this.handleResize();
    });
  }

  public handleResize = () => {
    const width = this.container.clientWidth || window.innerWidth || 1280;
    const height = this.container.clientHeight || window.innerHeight || 720;
    this.renderer.setSize(width, height);
    this.cameraController.updateAspect(width / height);
  };

  public setViewMode(mode: ViewMode) {
    this.viewMode = mode;
    if (mode === 'HQ_OFFICE') {
      this.office.group.visible = true;
      this.city.group.visible = true;
      this.cameraController.zoom(-15);
    } else {
      this.office.group.visible = true;
      this.city.group.visible = true;
      this.cameraController.zoom(30);
    }
  }

  private setupEventListeners() {
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const dom = this.renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      if (e.buttons === 1) {
        this.cameraController.pan(deltaX, deltaY);
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.cameraController.zoom(e.deltaY * 0.05);
    }, { passive: false });

    window.addEventListener('resize', this.handleResize);
  }

  public start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.renderLoop);
  }

  public stop() {
    this.isRunning = false;
    window.removeEventListener('resize', this.handleResize);
  }

  private renderLoop = (time: number) => {
    if (!this.isRunning) return;

    const deltaTime = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;

    this.cameraController.update(deltaTime);
    this.city.update(deltaTime);
    this.office.update(deltaTime);

    this.renderer.render(this.scene, this.cameraController.camera);
    requestAnimationFrame(this.renderLoop);
  };
}
