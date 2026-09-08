import * as THREE from 'three';

export interface OfficeEmployeeMesh {
  group: THREE.Group;
  targetX: number;
  targetZ: number;
  speed: number;
  state: 'WORKING' | 'WALKING';
  timer: number;
}

export class OfficeInterior {
  public group: THREE.Group = new THREE.Group();
  private employees: OfficeEmployeeMesh[] = [];
  private pulsingLights: THREE.PointLight[] = [];

  constructor() {
    this.buildRoomStructure();
    this.buildCryptoAndServerFarm();
    this.buildExecutiveTradingFloor();
    this.spawnEmployees();
  }

  private buildRoomStructure() {
    // Marble / Polished Hardwood diorama floor (14x14m)
    const floorGeo = new THREE.BoxGeometry(16, 0.4, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e28,
      roughness: 0.2,
      metalness: 0.4
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, 0.2, 0);
    floor.receiveShadow = true;
    this.group.add(floor);

    // Modern Gold / Cyan floor boundary trim
    const trimGeo = new THREE.BoxGeometry(16.2, 0.1, 16.2);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2
    });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.set(0, 0.45, 0);
    this.group.add(trim);

    // North & West Back Walls (Cutaway isometric diorama style)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x222938,
      roughness: 0.4
    });

    // North Wall
    const northWallGeo = new THREE.BoxGeometry(16, 5, 0.4);
    const northWall = new THREE.Mesh(northWallGeo, wallMat);
    northWall.position.set(0, 2.7, -8);
    northWall.castShadow = true;
    northWall.receiveShadow = true;
    this.group.add(northWall);

    // West Wall
    const westWallGeo = new THREE.BoxGeometry(0.4, 5, 16);
    const westWall = new THREE.Mesh(westWallGeo, wallMat);
    westWall.position.set(-8, 2.7, 0);
    westWall.castShadow = true;
    westWall.receiveShadow = true;
    this.group.add(westWall);

    // Wall Art / High-Tech World Market Map
    const artGeo = new THREE.PlaneGeometry(6, 2.5);
    const artMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true });
    const art = new THREE.Mesh(artGeo, artMat);
    art.position.set(0, 3.2, -7.78);
    this.group.add(art);
  }

  private buildCryptoAndServerFarm() {
    // Server Racks with pulsing LEDs in Northwest sector
    for (let i = 0; i < 3; i++) {
      const rackGeo = new THREE.BoxGeometry(1.2, 3.2, 0.8);
      const rackMat = new THREE.MeshStandardMaterial({
        color: 0x0c0f17,
        metalness: 0.8,
        roughness: 0.3
      });
      const rack = new THREE.Mesh(rackGeo, rackMat);
      rack.position.set(-6.5 + i * 1.6, 1.8, -6.5);
      rack.castShadow = true;
      this.group.add(rack);

      // Server Blinkers
      for (let j = 0; j < 4; j++) {
        const ledGeo = new THREE.BoxGeometry(0.8, 0.1, 0.05);
        const ledMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x00ff88 : 0x00f3ff
        });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(-6.5 + i * 1.6, 1.0 + j * 0.6, -6.08);
        this.group.add(led);
      }
    }

    // Server Pointlight
    const serverLight = new THREE.PointLight(0x00ffcc, 1.8, 8);
    serverLight.position.set(-5, 2.5, -5.5);
    this.group.add(serverLight);
    this.pulsingLights.push(serverLight);
  }

  private buildExecutiveTradingFloor() {
    // Executive Multi-Monitor Trading Desks
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x181e2b, roughness: 0.3 });
    const deskGeo = new THREE.BoxGeometry(3.5, 1.0, 1.6);
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(2.5, 0.9, -3.5);
    desk.castShadow = true;
    desk.receiveShadow = true;
    this.group.add(desk);

    // 3 Monitors on desk
    for (let m = -1; m <= 1; m++) {
      const screenGeo = new THREE.BoxGeometry(0.9, 0.5, 0.05);
      const screenMat = new THREE.MeshBasicMaterial({
        color: m === 0 ? 0x00ffaa : 0xffaa00
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(2.5 + m * 1.0, 1.7, -3.8);
      screen.rotation.y = -m * 0.2;
      this.group.add(screen);
    }

    // Executive Chair
    const chairGeo = new THREE.BoxGeometry(0.8, 1.2, 0.8);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3 });
    const chair = new THREE.Mesh(chairGeo, chairMat);
    chair.position.set(2.5, 0.8, -2.2);
    chair.castShadow = true;
    this.group.add(chair);

    // Luxury Sofa and Coffee Table in Lounge corner (Southeast)
    const sofaGeo = new THREE.BoxGeometry(4.0, 0.8, 1.4);
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x8b0000, roughness: 0.5 });
    const sofa = new THREE.Mesh(sofaGeo, sofaMat);
    sofa.position.set(3.5, 0.6, 4.0);
    sofa.castShadow = true;
    this.group.add(sofa);

    const tableGeo = new THREE.BoxGeometry(2.2, 0.5, 1.2);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x0f131a, metalness: 0.7 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(3.5, 0.45, 2.0);
    table.castShadow = true;
    this.group.add(table);
  }

  private spawnEmployees() {
    const roles = [
      { color: 0xffaa00, x: 2.5, z: -2.2 }, // Trader
      { color: 0x00f3ff, x: -4.5, z: -4.5 }, // Tech Lead
      { color: 0xff0055, x: 1.0, z: 2.0 },  // Executive
      { color: 0x39ff14, x: -2.0, z: 1.0 }  // Analyst
    ];

    for (const r of roles) {
      const empGroup = new THREE.Group();

      // Stylized character body
      const bodyGeo = new THREE.BoxGeometry(0.5, 0.8, 0.35);
      const bodyMat = new THREE.MeshStandardMaterial({ color: r.color, roughness: 0.4 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.8;
      body.castShadow = true;
      empGroup.add(body);

      // Head
      const headGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
      const headMat = new THREE.MeshStandardMaterial({ color: 0xffd1b3 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.35;
      head.castShadow = true;
      empGroup.add(head);

      empGroup.position.set(r.x, 0.2, r.z);
      this.group.add(empGroup);

      this.employees.push({
        group: empGroup,
        targetX: r.x,
        targetZ: r.z,
        speed: 1.5,
        state: 'WORKING',
        timer: Math.random() * 5 + 3
      });
    }
  }

  public update(deltaTime: number) {
    // Pulse server lights
    const time = Date.now() * 0.003;
    for (const light of this.pulsingLights) {
      light.intensity = 1.4 + Math.sin(time) * 0.5;
    }

    // Animate employees roaming / working
    for (const emp of this.employees) {
      emp.timer -= deltaTime;
      if (emp.timer <= 0) {
        if (emp.state === 'WORKING') {
          emp.state = 'WALKING';
          emp.targetX = (Math.random() - 0.5) * 8;
          emp.targetZ = (Math.random() - 0.5) * 8;
          emp.timer = Math.random() * 4 + 2;
        } else {
          emp.state = 'WORKING';
          emp.timer = Math.random() * 6 + 4;
        }
      }

      if (emp.state === 'WALKING') {
        const dx = emp.targetX - emp.group.position.x;
        const dz = emp.targetZ - emp.group.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist > 0.1) {
          emp.group.position.x += (dx / dist) * emp.speed * deltaTime;
          emp.group.position.z += (dz / dist) * emp.speed * deltaTime;
          emp.group.rotation.y = Math.atan2(dx, dz);
        }
      }
    }
  }
}
