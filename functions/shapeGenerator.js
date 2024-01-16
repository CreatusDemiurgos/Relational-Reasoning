class ShapeGenerator {
    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, sides){
        let randColor = this.getRandomColor();
        ctx.beginPath();
        const sideLength = containerWidth / (4 * sizeChager);
        const centerX = containerWidth / 2;
        const centerY = containerHeight /2;
    
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const x = centerX + sideLength * Math.cos(angle);
            const y = centerY + sideLength * Math.sin(angle);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    // the size is a value that is used when we want a shape to be inside another one, so we want the inner shapes to be smaller
    makeTriangle(ctx, containerWidth, containerHeight, sizeChager) {
        this.generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, 3);
    }

    makeSquare(ctx, containerWidth, containerHeight, sizeChager) {
        this.generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, 4);
    }

    makeRectangle(ctx, containerWidth, containerHeight, sizeChager) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.rect((containerWidth*sizeChager) / (8), ((containerHeight) / (2))- (containerHeight)/(4*sizeChager), 3*containerWidth / (4 * sizeChager), containerHeight / (2 * sizeChager));
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makePentagon(ctx, containerWidth, containerHeight, sizeChager) {
        this.generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, 5);
    }


    makeHexagon(ctx, containerWidth, containerHeight, sizeChager) {
        this.generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, 6);
}

    makeCircle(ctx, containerWidth, containerHeight, sizeChager) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.arc(containerWidth / 2, containerHeight / 2, containerWidth / (2.5 * sizeChager), 0, 2 * Math.PI);
        ctx.fillStyle = randColor;
        ctx.fill();
    }
}

export default ShapeGenerator;
