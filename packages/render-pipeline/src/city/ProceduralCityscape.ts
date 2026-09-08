import * as THREE from 'three';

export interface Vehicle {
  mesh: THREE.Mesh;
  speed: number;
  axis: 'X' | 'Z';
  direction: number;
  minPos: number;
  maxPos: number;
}

export class ProceduralCityscape {
  public group: THREE.Group = new THREE.Group();
  private vehicles: Vehicle[] = [];
  private skyscraperGroup: THREE.Group = new THREE.Group();

  constructor() {
    this.buildGroundAndRoads();
    this.buildSkyscrapers();
    this.buildTraffic();
    this.group.add(this.skyscraperGroup);
  }

  private buildGroundAndRoads() {
    // Wet asphalt reflective ground
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.25,
      metalness: 0.6
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    this.group.add(ground);

    // Grid road markings
    const gridHelper = new THREE.GridHelper(160, 32, 0x00f3ff, 0x222a38);
    gridHelper.position.y = 0.01;
    this.group.add(gridHelper);
  }

  private buildSkyscrapers() {
    const buildingColors = [0x1a2130, 0x141a24, 0x252e3d, 0x0f151f];
    const neonColors = [0x00f0ff, 0xff0055, 0x39ff14, 0xffb700];

    const grid = [-35, -20, 20, 35];

    for (const x of grid) {
      for (const z of grid) {
        // Skip center parcel where our HQ diorama sits
        if (Math.abs(x) < 15 && Math.abs(z) < 15) continue;

        const height = 15 + Math.random() * 35;
        const width = 8 + Math.random() * 4;
        const depth = 8 + Math.random() * 4;

        const geo = new THREE.BoxGeometry(width, height, depth);
        const mat = new THREE.MeshStandardMaterial({
          color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
          roughness: 0.3,
          metalness: 0.8
        });

        const building = new THREE.Mesh(geo, mat);
        building.position.set(x + (Math.random() * 4 - 2), height / 2, z + (Math.random() * 4 - 2));
        building.castShadow = true;
        building.receiveShadow = true;
        this.skyscraperGroup.add(building);

        // Neon roof sign or billboard
        if (Math.random() < 0.6) {
          const neonGeo = new THREE.BoxGeometry(width * 0.8, 1.2, 0.4);
          const neonMat = new THREE.MeshBasicMaterial({
            color: neonColors[Math.floor(Math.random() * neonColors.length)]
          });
          const neon = new THREE.Mesh(neonGeo, neonMat);
          neon.position.set(building.position.x, height + 0.6, building.position.z + depth / 2);
          this.skyscraperGroup.add(neon);
        }
      }
    }
  }

  private buildTraffic() {
    const carGeo = new THREE.BoxGeometry(1.8, 0.8, 0.9);
    const carColors = [0xffffff, 0xff2222, 0x2288ff, 0xffaa00, 0x111111];

    // Vehicles along East-West roads
    for (let i = 0; i < 12; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: carColors[Math.floor(Math.random() * carColors.length)],
        metalness: 0.9,
        roughness: 0.2
      });
      const car = new THREE.Mesh(carGeo, mat);
      car.castShadow = true;

      const zLane = i % 2 === 0 ? -12 : 12;
      const speed = 8 + Math.random() * 6;
      const direction = i % 2 === 0 ? 1 : -1;

      car.position.set(Math.random() * 100 - 50, 0.4, zLane);
      if (direction < 0) car.rotation.y = Math.PI;

      this.group.add(car);
      this.vehicles.push({
        mesh: car,
        speed,
        axis: 'X',
        direction,
        minPos: -70,
        maxPos: 70
      });
    }
  }

  public update(deltaTime: number) {
    for (const v of this.vehicles) {
      if (v.axis === 'X') {
        v.mesh.position.x += v.speed * v.direction * deltaTime;
        if (v.direction > 0 && v.mesh.position.x > v.maxPos) {
          v.mesh.position.x = v.minPos;
        } else if (v.direction < 0 && v.mesh.position.x < v.minPos) {
          v.mesh.position.x = v.maxPos;
        }
      }
    }
  }
}
