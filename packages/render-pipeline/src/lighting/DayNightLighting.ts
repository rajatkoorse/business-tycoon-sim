import * as THREE from 'three';

export class DayNightLighting {
  public sunLight: THREE.DirectionalLight;
  public ambientLight: THREE.AmbientLight;
  public hemiLight: THREE.HemisphereLight;
  public timeOfDay: number = 0.35; // 0.0 = midnight, 0.25 = sunrise, 0.5 = noon, 0.75 = sunset

  constructor(scene: THREE.Scene) {
    this.ambientLight = new THREE.AmbientLight(0x334466, 1.2);
    scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1.0);
    scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xfff5d0, 3.5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 250;
    const d = 50;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0005;
    scene.add(this.sunLight);
  }

  public setTime(t: number) {
    this.timeOfDay = (t % 1.0 + 1.0) % 1.0;
    const angle = this.timeOfDay * Math.PI * 2 - Math.PI / 2;

    const sunX = Math.cos(angle) * 80;
    const sunY = Math.max(5, Math.sin(angle) * 80);
    const sunZ = Math.sin(angle) * 50;
    this.sunLight.position.set(sunX, sunY, sunZ);

    // Dynamic color tuning for GTA style atmosphere
    if (this.timeOfDay > 0.70 && this.timeOfDay < 0.85) {
      // Golden hour / Sunset (GTA magenta / orange)
      this.sunLight.color.setHex(0xff7733);
      this.ambientLight.color.setHex(0x552244);
      this.sunLight.intensity = 4.0;
    } else if (this.timeOfDay >= 0.85 || this.timeOfDay <= 0.20) {
      // Neon Midnight
      this.sunLight.color.setHex(0x223366);
      this.ambientLight.color.setHex(0x111626);
      this.sunLight.intensity = 0.8;
    } else {
      // Day
      this.sunLight.color.setHex(0xfff8e7);
      this.ambientLight.color.setHex(0x334466);
      this.sunLight.intensity = 3.5;
    }
  }
}
