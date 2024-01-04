class ShapeGenerator {
    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    makeTriangle(ctx) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(250, 250);
        ctx.lineTo(50, 250);
        ctx.closePath();
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makeSquare(ctx) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.rect(50, 50, 200, 200); // x, y, width, height
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makeRectangle(ctx) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.rect(50, 50, 200, 100); // x, y, width, height
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makeHexagon(ctx) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(250, 100);
        ctx.lineTo(250, 200);
        ctx.lineTo(150, 250);
        ctx.lineTo(50, 200);
        ctx.lineTo(50, 100);
        ctx.closePath();
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makePentagon(ctx) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(250, 100);
        ctx.lineTo(200, 250);
        ctx.lineTo(100, 250);
        ctx.lineTo(50, 100);
        ctx.closePath();
        ctx.fillStyle = randColor;
        ctx.fill();
    }

    makeCircle(ctx) {
        let randColor = this.getRandomColor();
        ctx.beginPath();
        ctx.arc(150, 150, 125, 0, 2 * Math.PI); // x, y, radius, start angle, end angle
        ctx.fillStyle = randColor;
        ctx.fill();
    }
}

export default ShapeGenerator;
