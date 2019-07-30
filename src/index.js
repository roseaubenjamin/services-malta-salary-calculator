
// const pEl = wp.element.createElement("p", {}, "React.");
// wp.element.render(pEl, document.querySelector( '#calculator_content' ) );
import Calculator from './Calculator';

let interale = null ; 

interale = setInterval( () => {
	let $core = document.querySelector( '#calculator_content' ) ;
	console.log( $core )
	if ( $core ) {
		clearInterval( interale ) ; 
		wp.element.render(<Calculator />, $core );
	}
},1000)
