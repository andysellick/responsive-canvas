/* globals ted */
(function( window, undefined ) {
var ted = {
	canvas: 0,
	ctx: 0,
	canvasw: 0,
	canvash: 0,
	idealw: 500,
	idealh: 200,
	mode: 0, //0 = fullwidth, 1 = maintain aspect ratio and fit in page

    general: {
        init: function(){
            ted.canvas = document.getElementById('canvas');
            if(!ted.canvas.getContext){
                document.getElementById('canvas').innerHTML = 'Your browser does not support canvas. Sorry.';
            }
            else {
                ted.ctx = ted.canvas.getContext('2d');
                this.initCanvasSize();
            }
        },
        //initialise the size of the canvas based on the ideal aspect ratio and the size of the parent element
		initCanvasSize: function(){
			var parentel = document.getElementById('canvasparent');
			var targetw = parentel.offsetWidth;
			var targeth = parentel.offsetHeight;

			if(ted.mode === 1){ //resize the canvas to maintain aspect ratio depending on screen size (may result in gaps either side)
				var sizes = ted.general.calculateAspectRatio(ted.idealw,ted.idealh,targetw,targeth);
				ted.canvas.width = ted.canvasw = sizes[0];
				ted.canvas.height = ted.canvash = sizes[1];
			}
			else { //make canvas always full width, with appropriately scaled height (may go off bottom of page)
				ted.canvas.width = targetw;
				var scaleh = ted.general.calculatePercentage(targetw,ted.idealw);
				ted.canvas.height = (ted.idealh / 100) * scaleh;
			}
        },
        //returns the percentage amount that object is of wrapper
        calculatePercentage: function(object,wrapper){
			return((100 / wrapper) * object);
		},
        //given a width and height representing an aspect ratio, and the size of the containing thing, return the largest w and h matching that aspect ratio
		calculateAspectRatio: function(idealw,idealh,parentw,parenth){
			var aspect = Math.floor((parenth / idealh) * idealw);
			var cwidth = Math.min(idealw, parentw);
			var cheight = Math.min(idealh, parenth);
			var w = Math.min(parentw,aspect);
			var h = (w / idealw) * idealh;
			return([w,h]);
		},
        //resize the canvas and call init on all the elements as well
        resizeCanvas: function(){
			ted.general.initCanvasSize();
			ted.general.drawCircle();
		},
        clearCanvas: function(){
            ted.canvas.width = ted.canvas.width; //this is apparently a hack but seems to work
        },
        //draw a circle in the canvas to show where the canvas is, scaled according to the canvas size
        drawCircle: function(){
			var centerX = ted.canvas.width / 2;
			var centerY = ted.canvas.height / 2;
			var radius = ted.canvas.width / 10;
			ted.ctx.beginPath();
			ted.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			ted.ctx.fillStyle = 'green';
			ted.ctx.fill();
			ted.ctx.lineWidth = ted.canvas.width / 100;
			ted.ctx.strokeStyle = '#003300';
			ted.ctx.stroke();
		}
	}
};
window.ted = ted;
})(window);

window.onload = function(){
    ted.general.init();
    ted.general.drawCircle();

	var resize;
	window.addEventListener('resize', function(event){
		clearTimeout(resize);
		resize = setTimeout(ted.general.resizeCanvas,200);
	});
};
