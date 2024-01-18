class ShapeGenerator {
    getRandomColor() {
        const preSetColors = [
            "#0007ff", //blue
            "#00fffc", //light blue
            "#fa8c8c", //light red and pink
            "#c90004", //somewhat red
            "#fffe00", //light yellow
            "#b98d00", //dark yellow?
            "#1afe01", //light green/lime
            "0b6d01" //dark greens
        ];
        const randomIndex = Math.floor(Math.random() * preSetColors.length); 

        return preSetColors[randomIndex];
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
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.stroke();
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
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.stroke();
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
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fill();
        
    }
}

export default ShapeGenerator;
