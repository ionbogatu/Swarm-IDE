var hexagonSize = {
    width: 60,
    height: 90
}

var hsw = hexagonSize.width,
    hsh = hexagonSize.height;

joint.shapes.html = {};
joint.shapes.html.Hexagon = joint.shapes.basic.Generic.extend({
	markup: [
		'<path d="M' + hsw/2 + ' 0 L0 ' + hsh/3.75 + ' L0 ' + hsh/1.32 + ' L' + hsw/2 + ' ' + hsh + ' L' + hsw + ' ' + hsh/1.32 + ' L' + hsw + ' ' + hsh/3.75 + ' Z" />',
		'<text/>',
		'<g class="handlers"></g>'
	].join(''),

	defaults: joint.util.deepSupplement({
        type: 'hexagon',
        attrs: {
            'path': {
            	fill: '#ffffff',
            	stroke: '#7266ba',
            	'stroke-width': 2
            },
            'text': {
            	'font-size': 14,
            	'ref-x': .5,
            	'ref-y': .5,
            	ref: 'path',
            	'y-alignment': 'middle',
            	'x-alignment': 'middle',
            	fill: "#7266ba"
            },
            '.handlers': {
            	'ref-x': .5,
            	'ref-y': .5,
            	ref: 'path',
            	'y-alignment': 'middle',
            	'x-alignment': 'middle',
            	width: 100,
            	height: 100
            }
        },
        events: {
        	'mouseover': 'mouseOverEventHandler'
        },
        mouseOverEventHandler: function(){
        	console.log('hover');
        }
    }, joint.shapes.basic.Generic.prototype.defaults)
});