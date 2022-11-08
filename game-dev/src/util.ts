const loadImage = (path: string) => {
    const image = new Image()
    image.src = path
    return image
}

function drawImage(ctx:CanvasRenderingContext2D, img:HTMLImageElement, x:number, y:number, angle = 0, scale = 1){
    ctx.save();
    ctx.translate(x + img.width * scale / 2, y + img.height * scale / 2);
    ctx.rotate(angle * (Math.PI/180));
    ctx.translate(- x - img.width * scale / 2, - y - img.height * scale / 2);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    ctx.restore();
  }

export {
    loadImage,
    drawImage
}