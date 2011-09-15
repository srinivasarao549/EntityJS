re.keyboard = re.c('keyboard')
.static({
	listeners:[],
	
	keyCodes: { 
    /* start the a-z keys */
    65 : 'a',
    66:'b',
    67:'c',
    68:'d',
    69:'e',
    70:'f',
    71:'g',
    72:'h',
    73:'i',
    74:'j',
    75:'k',
    76:'l',
    77:'m',
    78:'n',
    79:'o',
    80:'p',
    81:'q',
    82:'r',
    83:'s',
    84:'t',
    85:'u',
    86:'v',
    87:'w',
    88:'x',
    89:'y',
    90:'z',
    /* start number keys */
    48:'0',
    49:'1',
    50:'2',
    51:'3',
    52:'4',
    53:'5',
    54:'6',
    55:'7',
    56:'8',
    57:'9',
    /* start the f keys */
    112:'f1',
    113:'f2',
    114:'f3',
    115:'f4',
    116:'f5',
    117:'f6',
    118:'f7',
    119:'f8',
    120:'f9',
    121:'f10',
    122:'f11',
    123:'f12',
    /* start the modifier keys */
    16:'shift',
    17:'ctrl', //mac os - control
    18:'alt',//mac os key - option opt
    24:'cmd', //Mac OS key - also command
	255:'fn',//lenovo - function
    /* Misc. Keys */
    8:'backspace',
    13:'enter', //max os - return
    32:'space',
    27:'esc',
    9:'tab',
    20:'capslock',
    91:'windows',//mac os - super
    45:'insert',
    46:'delete', //NOT THE OS X DELETE KEY!
    36:'home',
    35:'end',
    33:'pageup',
    34:'pagedown',
    /* Arrow keys */
    37:'left',
    38:'up',
    39:'right',
    40:'down',
    /* Special char keys */
    96:'`',
    45:'-',
    187:'=',
    219:'[',
    221:']',
    220:'\\', //it's actually a \ but there's two to escape the original
    59:';',
    222:"'",
    188:',',
    190:'.',
    191:'/'
	},
	
	keyboardEvent: function(e){
		var that = re.c('keyboard');
		
		e.keyCode = e.keyCode || e.which;
		
		var key = that.keyCodes[e.keyCode];
		
		if(re.c('pressed').preventDefault[key]){
			e.preventDefault();
		}
		
		if(re.c('pressed')._pressed){
			re.c('pressed')._pressed[key] = (e.type == 'keydown');
		}
		
		for(var k in that.listeners){
			that.listeners[k].signal(e.type, key);
			
			//call specific signal
			that.listeners[k].signal(e.type+':'+key);
		}
		
	}

})
.run(function(){
	//add event listeners
	document.addEventListener('keydown', this.keyboardEvent, false);
	document.addEventListener('keyup', this.keyboardEvent, false);
	
})
.init(function(c){
	//add to global key array
	c.listeners.push(this);
})
.dispose(function(c){
	//remove from global key array
	c.listeners.splice(c.listeners.indexOf(this), 1);
});
