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

/* LOAD IMAGE */
const image = new Image()
image.src = '../tQIbq1.png'
const enemy = new Image()
enemy.src = '../platformer_enemies.png'
/* IMAGE SIZE : 900x428 px 
  PRE IMAGE WIDTH : 900/6 = 150
  PRE IMAGE HEIGHT : 428/3 = 143
*/
const preImageWidth = 150
const preImageHeight = 143
const MAX_FRAME = 5
let frameX = 0
let frameY = 1
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



/* LOAD BACKGROUND */
const background = new Image()
background.src = '../background.jpg'
const background2 = new Image()
background2.src = '../background-2.jpg'
const background3 = new Image()
background3.src = '../background-3.webp'
const background4 = new Image()
background4.src = '../50580491-game-background-3.webp'
const background1 = new Image()
background1.src = '../background-1.jpg'
const ground = new Image()
ground.src = '../background-ground.png'
const ground1 = new Image()
ground1.src = '../ground2.jpg'
const grass = new Image()
grass.src = '../grass.png'
const sky = new Image()
sky.src = '../sky.png'
/* LOAD BACKGROUND */


interface LayerInterface {
  image: HTMLImageElement,
  width: number,
  heigth: number, 
  speedModifier: number,
  imageX?:number,
  imageY?:number,
  y?:number
}

class Layer {
  image: HTMLImageElement
  x: number
  x2: number
  y?: number
  width: number
  heigth: number
  imageX?: number
  imageY?: number
  speed: number

  constructor({image,width,heigth,speedModifier,imageX,imageY,y}:LayerInterface) {
    this.image = image
    this.x = 0
    this.y = y || 0
    this.width = width
    this.heigth = heigth
    this.x2 = this.width
    this.imageX = imageX
    this.imageY = imageY
    this.speed = gameSpeed * speedModifier
  }

  draw() {
    if (CTX === null) throw Error("CANVAS Undefined !")
    if (this.imageX&& this.imageY) {
      CTX.drawImage(this.image, this.x, this.y,this.imageX,this.imageY)
      CTX.drawImage(this.image, this.x2, this.y,this.imageX,this.imageY)
    } else {
      CTX.drawImage(this.image, this.x, this.y)
      CTX.drawImage(this.image, this.x2, this.y)
    }
  }

  update() {
    if (this.x <= - this.width) {
      this.x = this.width + this.x2 -this.speed
    }
    if (this.x2 <= - this.width) {
      this.x2 = this.width + this.x -this.speed
    }
    this.x = Math.floor(this.x - this.speed)
    this.x2 = Math.floor(this.x2 - this.speed)
    console.log(this.x,this.x2)
    this.draw()
  }
}

const layers:Layer[] = [
  new Layer({ image:background,width:612,heigth:328,speedModifier:.3 }),
  // new Layer({ image:background2,width:612,heigth:328,speedModifier:.3,imageX:612,imageY:500 }),
  // new Layer({ image:background1,width:612,heigth:328,speedModifier:.3,imageX:612,imageY:500 }),
  // new Layer({ image:background3,width:612,heigth:328,speedModifier:.3,imageX:612,imageY:500 }),
  new Layer({ image:ground,width:599,heigth:328,speedModifier:.9,y:400  }),
  // new Layer({ image:ground1,width:500,heigth:328,speedModifier:.9,y:400 ,imageX:612,imageY:50 }),
  new Layer({ image:grass,width:599,heigth:328,speedModifier:.3,y:60 }),
  // new Layer({ image:sky,width:599,heigth:328,speedModifier:1.5,y:20  }),
]


const setup = () => {
  if (CTX === null) throw Error("CANVAS Undefined !")
  // CTX.drawImage(image, 0, 0)
  // CTX.drawImage(image, 0, 0,CANVAS_WIDTH,CANVAS_HEIGHT)
  let position = Math.floor(gameFrame/staggerFrames)
  // frameX = preImageWidth*position
  // frameBATX = preImageEnemyWidth* (position % MAX_BAT_FRAME )
  frameSkeletonX = preImageSkeletonWidth* (position % MAX_Skeleton_FRAME )
  layers.forEach(layer => layer.update())
  // CTX.drawImage(image, frameX, frameY * preImageHeight, preImageWidth, preImageHeight, x*.05, 300, preImageWidth, preImageHeight)
  // CTX.drawImage(enemy, frameBATX,0, preImageEnemyWidth, preImageEnemyHeight, 0, 100, 70, 70)
  CTX.drawImage(enemy, frameSkeletonX,1 * preImageEnemyWidth, preImageEnemyWidth, preImageSkeletonHeight, 0, 100, 100, 100)
  console.log(frameX)
  gameFrame ++
  x ++ 
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

