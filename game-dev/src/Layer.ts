interface LayerInterface {
    image: HTMLImageElement,
    width: number,
    heigth: number,
    speedModifier: number,
    imageX?: number,
    imageY?: number,
    y?: number
}

export default class Layer {
    image: HTMLImageElement
    x: number
    x2: number
    y?: number
    width: number
    heigth: number
    imageX?: number
    imageY?: number
    speed: number
    private static _CTX: CanvasRenderingContext2D | null
    private static _gameSpeed: number

    constructor({ image, width, heigth, speedModifier, imageX, imageY, y }: LayerInterface) {
        this.image = image
        this.x = 0
        this.y = y
        this.width = width
        this.heigth = heigth
        this.x2 = this.width
        this.imageX = imageX
        this.imageY = imageY
        this.speed = Layer._gameSpeed * speedModifier
    }

    public static get CTX(): CanvasRenderingContext2D | null {
        return Layer._CTX
    }
    public static set CTX(value: CanvasRenderingContext2D | null) {
        Layer._CTX = value
    }

    public static get gameSpeed(): number {
        return Layer._gameSpeed
    }
    public static set gameSpeed(value: number) {
        Layer._gameSpeed = value
    }


    draw() {
        if (Layer._CTX === null) throw Error("CANVAS Undefined !")
        if (this.imageX && this.imageY) {
            Layer._CTX.drawImage(this.image, this.x, this.y || 0, this.imageX, this.imageY)
            Layer._CTX.drawImage(this.image, this.x2, this.y || 0, this.imageX, this.imageY)
        } else {
            Layer._CTX.drawImage(this.image, this.x, this.y || 0)
            Layer._CTX.drawImage(this.image, this.x2, this.y || 0)
        }
    }

    update() {
        if (this.x <= - this.width) {
            this.x = this.width + this.x2 - this.speed
        }
        if (this.x2 <= - this.width) {
            this.x2 = this.width + this.x - this.speed
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
        this.draw()
    }
}