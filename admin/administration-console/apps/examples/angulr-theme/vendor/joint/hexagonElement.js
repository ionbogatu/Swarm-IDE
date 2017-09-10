var hexagonSize = {
    width: 60,
    height: 90
}

var hsw = hexagonSize.width,
    hsh = hexagonSize.height;

joint.shapes.html = {};
joint.shapes.html.Hexagon = joint.shapes.devs.Model.extend({
	markup: [
        '<circle class="handlers-wrapper" cx="30" cy="45" r="60" stroke="silver" stroke-opacity="0.7" stroke-width="7" fill="transparent"/>',
		'<path d="M' + hsw/2 + ' 0 L0 ' + hsh/3.75 + ' L0 ' + hsh/1.32 + ' L' + hsw/2 + ' ' + hsh + ' L' + hsw + ' ' + hsh/1.32 + ' L' + hsw + ' ' + hsh/3.75 + ' Z" />',
		'<text/>'
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
            }           
        },
        ports: {
            groups: {
                'top': {
                    attrs: {
                        circle: {
                            fill: 'white',
                            stroke: '#aaa',
                            'stroke-width': 2,
                            cx: 30,
                            cy: -16,
                            r: 7,
                            magnet: false,
                            class: 'handler'
                        }
                    }
                },
                'bottom': {
                    attrs: {
                        circle: {
                            fill: 'white',
                            stroke: '#aaa',
                            'stroke-width': 2,
                            cx: 30,
                            cy: 105,
                            r: 7,
                            magnet: false,
                            class: 'handler'
                        }
                    }
                },
                'left': {
                    attrs: {
                        circle: {
                            fill: 'white',
                            stroke: '#aaa',
                            'stroke-width': 2,
                            cx: -30,
                            cy: 44,
                            r: 7,
                            magnet: false,
                            class: 'handler'
                        }
                    }
                },
                'right': {
                    attrs: {
                        circle: {
                            fill: 'white',
                            stroke: '#aaa',
                            'stroke-width': 2,
                            cx: 90,
                            cy: 44,
                            r: 7,
                            magnet: false,
                            class: 'handler'
                        }
                    }
                }
            }
        }
    }, joint.shapes.basic.Generic.prototype.defaults)
});