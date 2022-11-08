import Layer from "./Layer"
import { drawImage, loadImage } from "./util"

/* CREATE NEW CANVAS ELEMENT */
const CANVAS: HTMLCanvasElement = document.createElement('canvas')
const app = document.querySelector('div#app')
app?.appendChild(CANVAS)

/* CANVAS SETUP */
CANVAS.style.border = "1px solid"
const CANVAS_WIDTH = 600, CANVAS_HEIGHT = 500
CANVAS.width = CANVAS_WIDTH
CANVAS.height = CANVAS_HEIGHT
const CTX = CANVAS.getContext('2d')
/* GLOBAL CONSTANT */
let frame = 30
const framesLength = 6
const gameSpeed = 1

/* LOAD BACKGROUND */

Layer.CTX = CTX
Layer.gameSpeed = gameSpeed
const layers:Layer[] = [
  new Layer({ image:loadImage('../background.jpg'),width:612,heigth:328,speedModifier:.3 }),
  // new Layer({ image:loadImage('../background-2.jpg'),width:612,heigth:328,speedModifier:.3,imageX:612,imageY:500 }),
  // new Layer({ image:loadImage('../background-1.jpg'),width:612,heigth:328,speedModifier:.3,imageX:612,imageY:500 }),
  // new Layer({ image:loadImage('../background-3.webp'),width:612,heigth:328,speedModifier:.3,imageX:612,imageY:500 }),
  new Layer({ image:loadImage('../background-ground.png'),width:599,heigth:328,speedModifier:.9,y:400  }),
  // new Layer({ image:loadImage('../ground2.jpg'),width:500,heigth:328,speedModifier:.9,y:400 ,imageX:612,imageY:50 }),
  new Layer({ image:loadImage('../grass.png'),width:599,heigth:328,speedModifier:.3,y:60 }),
  // new Layer({ image:loadImage('../sky.png'),width:599,heigth:328,speedModifier:1.5,y:20  }),
]

/* END LOAD BACKGROUND */


/* LOAD IMAGE */
const image = new Image()
image.src = '../tQIbq1.png'
/* IMAGE SIZE : 900x428 px 
  PRE IMAGE WIDTH : 900/6 = 150
  PRE IMAGE HEIGHT : 428/3 = 143
*/
const preImageWidth = 150
const preImageHeight = 143
const MAX_FRAME = 5
let frameX = 0
let frameY = 1




const enemy = new Image()
enemy.src = '../platformer_enemies.png'
/* IMAGE SIZE : 900x428 px 
  PRE IMAGE WIDTH : 377/6 = 150
  PRE IMAGE HEIGHT : 150/3 = 143
*/
const preImageEnemyWidth = 126
const preImageEnemyHeight = 150
const MAX_BAT_FRAME = 2
let frameBATX = 0

const preImageSkeletonWidth = 132
const preImageSkeletonHeight = 260
const MAX_Skeleton_FRAME = 3
let frameSkeletonX = 0

let gameFrame = 0
let staggerFrames = 5
let x = 0
/* LOAD IMAGE */


let batY = 250

const setup = () => {
  if (CTX === null) throw Error("CANVAS Undefined !")
  // CTX.drawImage(image, 0, 0)
  // CTX.drawImage(image, 0, 0,CANVAS_WIDTH,CANVAS_HEIGHT)
  /* LOAD BACKGROUND */
  layers.forEach(layer => layer.update())

  /* LOAD PLAYER  */
  let position = Math.floor(gameFrame/staggerFrames)
  frameX = preImageWidth* (position % MAX_FRAME )
  CTX.drawImage(image, frameX, frameY * preImageHeight, preImageWidth, preImageHeight, 0, 300, preImageWidth, preImageHeight)
  /* LOAD ENEMIES */
  frameBATX = preImageEnemyWidth* (position % MAX_BAT_FRAME )
  CTX.drawImage(enemy, frameBATX,0, preImageEnemyWidth, preImageEnemyHeight, 0, batY, 70, 70)
  // drawImage(CTX,enemy,frameBATX,preImageEnemyWidth,180,1)
  // CTX.restore()
  // CTX.rotate(-angleInRadians)
  // CTX.drawImage(enemy, frameSkeletonX,1 * preImageEnemyWidth, preImageEnemyWidth, preImageSkeletonHeight, 0, 100, 100, 100)
  // console.log(frameX)
  batY += Math.sin(Math.random(0,1)) 
  gameFrame ++
}

/* GAME LOOP RUNNING 60 frame pre seconds  */
function gameLoop() {
  if (CTX === null) throw Error("CANVAS Undefined !")
  /* CLEAR RECT */
  CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  setup()
  requestAnimationFrame(gameLoop)
}

/* RUN THE GAME LOOP */
gameLoop()

