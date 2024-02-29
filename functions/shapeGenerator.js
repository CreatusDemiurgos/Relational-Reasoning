class ShapeGenerator {
    getRandomColor() {
        const preSetColors = [
            "#00fffc", //light blue
            "#0007ff", //dark blue
            "#fa8c8c", //light red and pink
            "#c90004", //somewhat red
            "#fffe00", //light yellow
            "#b98d00", //dark yellow
            "#1afe01", //light green/lime
            "#0b6d01" //dark greens
        ];
        const randomIndex = Math.floor(Math.random() * preSetColors.length); 

        return preSetColors[randomIndex];
    }

    processColor(color) {
        if(color === "#00fffc"){
            return ["light", "blue"]; 
        }else if(color ==="#0007ff"){
            return ["dark", "blue"];
        }else if(color ==="#fa8c8c"){
            return ["light", "red"];
        }else if(color ==="#c90004"){
            return ["dark", "red"];
        }else if(color ==="#fffe00"){
            return ["light", "yellow"];
        }else if(color ==="#b98d00"){
            return ["dark", "yellow"];
        }else if(color ==="#1afe01"){
            return ["light", "green"];
        }else if(color ==="#0b6d01" ){
            return ["dark", "green"];
        }else{
            console.error("color not on the list");
        }
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
        return this.processColor(randColor);
    }

    // the size is a value that is used when we want a shape to be inside another one, so we want the inner shapes to be smaller
    makeTriangle(ctx, containerWidth, containerHeight, sizeChager) {
        let randColor = this.generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, 3);
        return randColor;
    }

    makeSquare(ctx, containerWidth, containerHeight, sizeChager) {
        let randColor = this.generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, 4);
        return randColor;
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
        return this.processColor(randColor);
    }

    makePentagon(ctx, containerWidth, containerHeight, sizeChager) {
        let randColor = this.generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, 5);
        return randColor;
    }


    makeHexagon(ctx, containerWidth, containerHeight, sizeChager) {
        let randColor = this.generateRegularPols(ctx, containerWidth, containerHeight,sizeChager, 6);
        return randColor;
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
        return this.processColor(randColor);
    }
}

export default ShapeGenerator;
