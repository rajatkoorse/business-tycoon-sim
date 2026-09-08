import * as THREE from 'three';

export class IsometricCameraController {
  public camera: THREE.PerspectiveCamera;
  private currentYaw: number = THREE.MathUtils.degToRad(45);
  private targetYaw: number = THREE.MathUtils.degToRad(45);
  private pitch: number = THREE.MathUtils.degToRad(35.264); // True Isometric (35.264 degrees)
  private currentDistance: number = 75;
  private targetDistance: number = 75;
  private targetPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private currentPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  constructor(aspect: number) {
    // 28 deg narrow FOV creates true diorama isometric perspective
    this.camera = new THREE.PerspectiveCamera(28, aspect, 0.1, 1000);
    this.updateCameraTransform();
  }

  public rotateQuarter(clockwise: boolean = true) {
    const delta = clockwise ? Math.PI / 2 : -Math.PI / 2;
    this.targetYaw += delta;
  }

  public zoom(delta: number) {
    this.targetDistance = THREE.MathUtils.clamp(this.targetDistance + delta, 25, 160);
  }

  public pan(screenDeltaX: number, screenDeltaY: number) {
    const forward = new THREE.Vector3(-Math.sin(this.currentYaw), 0, -Math.cos(this.currentYaw));
    const right = new THREE.Vector3(Math.cos(this.currentYaw), 0, -Math.sin(this.currentYaw));

    const panSpeed = this.currentDistance * 0.0012;
    this.targetPosition.addScaledVector(right, -screenDeltaX * panSpeed);
    this.targetPosition.addScaledVector(forward, screenDeltaY * panSpeed);
  }

  public update(deltaTime: number) {
    const damp = 1.0 - Math.exp(-12 * deltaTime);
    this.currentYaw = THREE.MathUtils.lerp(this.currentYaw, this.targetYaw, damp);
    this.currentDistance = THREE.MathUtils.lerp(this.currentDistance, this.targetDistance, damp);
    this.currentPosition.lerp(this.targetPosition, damp);

    this.updateCameraTransform();
  }

  public updateAspect(aspect: number) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  private updateCameraTransform() {
    const x = this.currentPosition.x + this.currentDistance * Math.sin(this.currentYaw) * Math.cos(this.pitch);
    const y = this.currentPosition.y + this.currentDistance * Math.sin(this.pitch);
    const z = this.currentPosition.z + this.currentDistance * Math.cos(this.currentYaw) * Math.cos(this.pitch);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.currentPosition);
  }
}
