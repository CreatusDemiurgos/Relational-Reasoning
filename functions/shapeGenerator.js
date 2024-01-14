class ShapeGenerator {
    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    makeTriangle(ctx, containerWidth, containerHeight) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.moveTo(containerWidth / 4, containerHeight / 4);
        ctx.lineTo((3 * containerWidth) / 4, containerHeight / 4);
        ctx.lineTo(containerWidth / 2, (3 * containerHeight) / 4);
        ctx.closePath();
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makeSquare(ctx, containerWidth, containerHeight) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.rect(containerWidth / 4, containerHeight / 4, containerWidth / 2, containerHeight / 2);
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makeRectangle(ctx, containerWidth, containerHeight) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.rect(containerWidth / 8, 1*containerHeight / 4, 3*containerWidth / 4, containerHeight / 2);
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makePentagon(ctx, containerWidth, containerHeight) {
        let randColor = this.getRandomColor();
        const sideLength = containerWidth/3.5;
        const centerX = containerWidth /2;
        const centerY = containerHeight/2;
        const pentagonDegree = 108*(Math.PI/180);
        ctx.beginPath();
        for(let i = 0; i < 5; i++){
            const angle = (1/2)*Math.PI + (i * 2 * Math.PI)/5;
            const x = centerX + sideLength * Math.cos(angle);
            const y = centerY + sideLength * Math.sin(angle);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = randColor;
        ctx.fill();
    }


    makeHexagon(ctx, containerWidth, containerHeight) {
    let randColor = this.getRandomColor();
    ctx.beginPath();
    const sideLength = containerWidth / 4; // Adjust as needed
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    for (let i = 0; i < 6; i++) {
        const angle = (i * 2 * Math.PI) / 6;
        const x = centerX + sideLength * Math.cos(angle);
        const y = centerY + sideLength * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = randColor;
    ctx.fill();
}

    makeCircle(ctx, containerWidth, containerHeight) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.arc(containerWidth / 2, containerHeight / 2, containerWidth / 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = randColor;
        ctx.fill();
    }
}

export default ShapeGenerator;
