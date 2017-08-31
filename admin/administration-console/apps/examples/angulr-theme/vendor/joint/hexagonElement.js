joint.shapes.html = {};
joint.shapes.html.Hexagon = joint.shapes.basic.Generic.extend({
	markup: [
		'<path d="M30 0 L0 24 L0 68 L30 90 L60 68 L60 24 Z" />',
		'<text/>',
		'<g class="handlers">',
		'</g>'
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