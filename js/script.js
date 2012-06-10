// /* Author: Luke Chapman
///////////////////////////////////////////////////////////////////////
//  Gear
///////////////////////////////////////////////////////////////////////
/**
 * Gear constructor
 * @constructor
 * @augments Kinetic.Shape
 * @param {Object} config
 */
Kinetic.Gear = function(config) {
    config.drawFunc = function() {
        var canvas = this.getCanvas();
        var context = this.getContext();
        var numPoints = this.numTeeth * 2;
        
        // draw gear teeth
        context.beginPath();
        context.lineJoin = "bevel";
        var R = (2 * Math.PI)/numPoints;
        var currentRadians = 0;
        for (var n = 0; n < numPoints; n++) {
            var radius = null;

            if (n % 2 == 0) {
                radius = this.outerRadius;
            }
            else {
                radius = this.innerRadius;
            }
            
            var theta = this.theta;
            theta += ((Math.PI * 2) / numPoints) * (n + 1);
            
            context.arc(this.x,this.y,radius,currentRadians + theta,currentRadians + theta + R,false);
        }
        context.closePath();
        if(this.patternImage){
            this.setFill(context.createPattern(this.patternImage, "repeat"));
        }
        
        // draw gear hole
        context.moveTo(this.x + this.holeRadius, this.y);
        context.arc(this.x, this.y, this.holeRadius, 0, 2 * Math.PI, true);
        this.fillStroke();
    };
    // call super constructor
    Kinetic.Shape.apply(this, [config]);
};
/*
 * Circle methods
 */
Kinetic.Gear.prototype = {
    /**
     * set radius
     * @param {Number} radius
     */
    setRadius: function(radius) {
        this.radius = radius;
    },
    /**
     * get radius
     */
    getRadius: function() {
        return this.radius;
    }
};

 // extend Shape
Kinetic.GlobalObject.extend(Kinetic.Gear, Kinetic.Shape);

window.onload = function() {
    var image = new Image();
    image.src = "img/pattern.png";
    var stage = new Kinetic.Stage({
    container: "container",
            width: 578,
            height: 500
        });
    var layer = new Kinetic.Layer();
 
    var gear = new Kinetic.Gear({
        x: 120,
        y: 105,
        outerRadius: 80,
        innerRadius: 70,
        holeRadius: 55,
        numTeeth: 10,
        fill: "red",
        stroke: "black",
        strokeWidth: 1,
        centerOffset: {
            x: 120,
            y: 105
        },
        theta: 0,
        patternImage: image
    });
    
    var gear2 = new Kinetic.Gear({
        x: 222,
        y: 190,
        outerRadius: 60,
        innerRadius: 50,
        holeRadius: 5,
        numTeeth: 8,
        theta: 0,
        stroke: "black",
        fill: "#AD0825",
        strokeWidth: 1,
        centerOffset: {
            x: 222,
            y: 190
        },
    });

    // add the gear shape to the layer
    layer.add(gear);
    layer.add(gear2);

    // add the layer to the stage
    stage.add(layer);

    //animate gear
    stage.onFrame(function(frame) {
        gear.rotate(Math.PI / 100);
        gear2.rotate(-(Math.PI / 100)*1.25);
        layer.draw();
    });

    stage.start();
};


