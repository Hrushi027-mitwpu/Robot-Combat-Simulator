alert ( " Getttt Setttt Combattttt !!!!!" )

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const clock = new THREE.Clock();
const darkColor = new THREE.Color(0x5C3100);   // #5C3100
const brightColor = new THREE.Color(0xFF7F50);
const dynamicColor = new THREE.Color();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0, 30, 25); 
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#game-canvas')});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio) ;

const controls = new OrbitControls( camera, renderer.domElement ); // Interactive Controls with mouse (zoom,palm movement)

const hemisphereLight = new THREE.HemisphereLight(
    0xffffff,
    0x8d8d8d, 
    3
);
scene.add(hemisphereLight);

/* const light = new THREE.AmbientLight( 0xffffff, 1);
scene.add( light );
*/


const floorGeometry = new THREE.PlaneGeometry(40, 40, 40,40);
const floorMaterial = new THREE.MeshStandardMaterial(
    { color: 0xFFFFFF, 
    metalness: 0, 
    roughness: 0.9,
    side: THREE.DoubleSide , 
    wireframe: true
                        
            
    });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wallHeight = 6;
const wallThickness = 0.1;
const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,  // #111111
    metalness: 0.5,
    roughness: 0.5,
    side: THREE.DoubleSide
});

const backSideWall = new THREE.Mesh(
    new THREE.BoxGeometry(40, wallHeight, wallThickness),  // width(length || x), height(length || y), depth( length||z)
    wallMaterial
);
backSideWall.position.set(0, wallHeight / 2, -20); 
scene.add(backSideWall);

const frontSidewall = new THREE.Mesh(
    new THREE.BoxGeometry(40, wallHeight, wallThickness),  
    wallMaterial
);
frontSidewall.position.set(0, wallHeight / 2, 20); 
scene.add(frontSidewall);

const leftSideWall = new THREE.Mesh(
   new THREE.BoxGeometry(wallThickness, wallHeight, 40),  
    wallMaterial
);
leftSideWall.position.set(-20, wallHeight / 2, 0); 
scene.add(leftSideWall);

const rightSideWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 40),
    wallMaterial
);
rightSideWall.position.set(20, wallHeight / 2, 0); 
scene.add(rightSideWall);

// ********************** ROBOTS ************************* //

// colours: #00FFFF #00FF00 #7FFF00 #C68863 #FEE3D4
/* ///////////////////////////////////////////////////OLD ROBOT CODE*********************88
 // ********* Player Robot
const playerRobotHeadgeometry = new THREE.SphereGeometry( 1, 32, 32 ); 
const playerRobotHeadmaterial = new THREE.MeshStandardMaterial( { color: 0xFEE3D4 } ); 
const playerRobotHead = new THREE.Mesh(playerRobotHeadgeometry, playerRobotHeadmaterial); 
playerRobotHead.position.set(-15,wallHeight/2 +3,-15) 
 // The robots head centre is set over robots body's centre + robots head's radius
scene.add( playerRobotHead );

const playerRobotGeometry = new THREE.BoxGeometry( 2, 4, 2 ); 
const playerRobotMaterial = new THREE.MeshStandardMaterial( {color: 0x00FF00} ); 
const playerRobotBody = new THREE.Mesh( playerRobotGeometry, playerRobotMaterial ); 
playerRobotBody.position.set(-15,wallHeight/2,-15) ;
scene.add(playerRobotBody);

const playerRobotGroup = new THREE.Group();
playerRobotGroup.add( playerRobotHead );
playerRobotGroup.add( playerRobotBody );

scene.add( playerRobotGroup );

//*********** Enemy Robot

const enemyRobotGeometry = new THREE.BoxGeometry( 2, 4, 2 ); 
const enemyRobotMaterial = new THREE.MeshStandardMaterial( {color: 0x00FFFF} ); 
const enemyRobotBody = new THREE.Mesh(enemyRobotGeometry,enemyRobotMaterial ); 
enemyRobotBody.position.set(15,wallHeight/2,15) ;
scene.add( enemyRobotBody );

const enemyRobotHeadgeometry = new THREE.SphereGeometry( 1, 32, 32 ); 
const enemyRobotHeadmaterial = new THREE.MeshStandardMaterial( { color: 0xFEE3D4 } ); 
const enemyRobotHead = new THREE.Mesh(enemyRobotHeadgeometry, enemyRobotHeadmaterial); 
enemyRobotHead.position.set(15,wallHeight/2 +3,15) 
 // The robots head centre is set over robots body's centre + robots head's radius
scene.add( enemyRobotHead );

const enemyRobotGroup = new THREE.Group();
enemyRobotGroup.add( enemyRobotHead );
enemyRobotGroup.add( enemyRobotBody );

scene.add( enemyRobotGroup );

// ********************* Player Controls  colours: #00FFFF #00FF00 #7FFF00 #C68863 #FEE3D4

const keys = {}

document.addEventListener('keydown', (event) => {
    keys[event.code] = true; // event.key
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

const playerSpeed = 0.1;
const arenaSize = 20;
function movePlayerConstantly() {
    if (keys['KeyW']) {
        playerRobotGroup.position.z = playerRobotGroup.position.z - playerSpeed;
    }
    if (keys['KeyS']) {
        playerRobotGroup.position.z = playerRobotGroup.position.z + playerSpeed;
    }
    if (keys['KeyA']) {
        playerRobotGroup.position.x = playerRobotGroup.position.x - playerSpeed;
    }
    if (keys['KeyD']) {
        playerRobotGroup.position.x = playerRobotGroup.position.x + playerSpeed;
    }

    playerRobotGroup.position.x = Math.max(-arenaSize, Math.min(arenaSize, playerRobotGroup.position.x));
    playerRobotGroup.position.z = Math.max(-arenaSize, Math.min(arenaSize, playerRobotGroup.position.z));
}

 */

function createRobotGroup(bodyColor, headColor) {
    const robot = new THREE.Group();

    const bodyWidth = 2;    // ||x
    const bodyHeight = 4;   // ||y
    const bodyDepth = 2;   //  ||z
    const headRadius = 1;   

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth),
        new THREE.MeshStandardMaterial({ color: bodyColor})
    );
    body.position.y = wallHeight / 2;
    robot.add(body);

    const head = new THREE.Mesh(
        new THREE.SphereGeometry(headRadius, 32, 32),
        new THREE.MeshStandardMaterial({ color: headColor })
    );
    head.position.y = (wallHeight / 2) + (bodyHeight / 2) + headRadius;
    robot.add(head);

    return robot;
}

const playerRobotGroup = createRobotGroup(0x00FF00, 0xFEE3D4);
playerRobotGroup.position.set(-15, 0, -15);
scene.add(playerRobotGroup);

const enemyRobotGroup = createRobotGroup(0x00FFFF, 0xFEE3D4);
enemyRobotGroup.position.set(15, 0, 15);
scene.add(enemyRobotGroup);

// *********************** Health Bars ******************** // 

//************* Player Health Bar 
let playerHealth = 100;
let enemyHealth = 100;
const playerHealthBarGeometry = new THREE.BoxGeometry(4, 0.3, 0.3);
const playerHealthBarMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
const playerHealthBar = new THREE.Mesh(playerHealthBarGeometry, playerHealthBarMaterial);
playerHealthBar.position.set(-15, 8, -15); // Position above player robot
scene.add(playerHealthBar);

// ************* Enemy Health Bar 
const enemyHealthBarGeometry = new THREE.BoxGeometry(4, 0.3, 0.3);
const enemyHealthBarMaterial = new THREE.MeshStandardMaterial({ color: 0x00FFFF });
const enemyHealthBar = new THREE.Mesh(enemyHealthBarGeometry, enemyHealthBarMaterial);
enemyHealthBar.position.set(15, 8, 15); // Position above enemy robot
scene.add(enemyHealthBar);

//******************Adding of Black border to health bars 

// Player health bar border using line segment 
const playerHealthBarEdges = new THREE.EdgesGeometry(playerHealthBarGeometry);
const playerHealthBarBorder = new THREE.LineSegments(
    playerHealthBarEdges,
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2  })
);
playerHealthBar.add(playerHealthBarBorder);

// Enemy health bar border
const enemyHealthBarEdges = new THREE.EdgesGeometry(enemyHealthBarGeometry);
const enemyHealthBarBorder = new THREE.LineSegments(
    enemyHealthBarEdges,
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })  // wireframe
);
enemyHealthBar.add(enemyHealthBarBorder);

// Function to update health bars visually

function updateHealthBars() {
    const playerHealthPercent = playerHealth / 100; 
    playerHealthBar.scale.x = playerHealthPercent;
    
    const enemyHealthPercent = enemyHealth / 100; 
    enemyHealthBar.scale.x = enemyHealthPercent;

    if (playerHealth < 30) {
        playerHealthBarMaterial.color.set(0xFF0000); // Red , i.e, critical
    }
    else if (playerHealth < 50) {
        playerHealthBarMaterial.color.set(0xFFFF00); // Yellow , tending to critical
    }
    else {
        playerHealthBarMaterial.color.set(0x00FF00);
    }
    
    if (enemyHealth < 30) {
        enemyHealthBarMaterial.color.set(0xFF0000);
    }
    else if (enemyHealth < 50) {
         enemyHealthBarMaterial.color.set(0xFFFF00); 
    }
    else   {
        enemyHealthBarMaterial.color.set(0x00FFFF);
    }
}

// ********************* Player Controls ********************* //

const keys = {};

document.addEventListener('keydown', (event) => {
keys[event.code] = true;
if (event.code === 'Space'&& playerHealth > 0) {
        const distanceBetweenRobots = playerRobotGroup.position.distanceTo(enemyRobotGroup.position);

if (distanceBetweenRobots < 10) {
enemyHealth = Math.max(0,enemyHealth - 10);
            
console.log("Enemy is in radar KILLLLLL HIMMMMMMMMMM!");
console.log("Enemy Health :-", enemyHealth )
} 
else {
    /* alert('Enemy is Far move closer!')   */    
    console.log("Enemy is Far move closer! Distance:", distanceBetweenRobots);
}   
    }

});
document.addEventListener('keyup', (event) => {
keys[event.code] = false;
});
// Player movement
const playerSpeed = 0.3;
const arenaSize = 19;
function movePlayerConstantly() {
    if (keys['KeyW']) {
        playerRobotGroup.position.z = playerRobotGroup.position.z - playerSpeed;
    }
    if (keys['KeyS']) {
        playerRobotGroup.position.z = playerRobotGroup.position.z + playerSpeed;
    }
    if (keys['KeyA']) {
        playerRobotGroup.position.x = playerRobotGroup.position.x - playerSpeed;
    }
    if (keys['KeyD']) {
        playerRobotGroup.position.x = playerRobotGroup.position.x + playerSpeed;
    }
    playerRobotGroup.position.x = Math.max(-arenaSize, Math.min(arenaSize, playerRobotGroup.position.x));
    playerRobotGroup.position.z = Math.max(-arenaSize, Math.min(arenaSize, playerRobotGroup.position.z));
}


// ********************* Window Resize Handling ********************* //
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

})


//**************************************** Animation Log
function animate() 
{
const elapsedTime = clock.getElapsedTime();
const alpha = (Math.sin(elapsedTime * 5) + 1) / 2;
dynamicColor.copy(darkColor).lerp(brightColor, alpha);
scene.background = dynamicColor;
movePlayerConstantly();
updateHealthBars();
// Keep health bars above robots
const healthBarMove = 8;
playerHealthBar.position.copy(playerRobotGroup.position);
playerHealthBar.position.y = playerRobotGroup.position.y + healthBarMove
// Enemy Attack Random
const distanceBetweenRobots = playerRobotGroup.position.distanceTo(enemyRobotGroup.position);

if (distanceBetweenRobots < 10) {
    if (Math.random() < 0.05) {
        playerHealth = playerHealth - 20;
        
        if (playerHealth < 0) {
            playerHealth = 0;
        }
        
        console.log("Enemy attacked You ,Backofffffffffffff!");
        console.log("Your Health -> ", playerHealth)
    }
}

// ****************** Game Loop Stop
if (playerHealth <= 0) {
    alert(("GAME OVER!, YOU LOST, Refresh to start a new game"));
    console.log("GAME OVER!, YOU LOST")
    playerSpeed = 0;
}

if (enemyHealth <= 0) {
    alert('You Won, Refresh again to start the new game ')
    console.log("VICTORY! GGs");
    playerSpeed = 0;
}
controls.update();

renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);