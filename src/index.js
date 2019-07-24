
// const pEl = wp.element.createElement("p", {}, "React.");
// wp.element.render(pEl, document.querySelector( '#calculator_content' ) );
import Calculator from './Calculator';

let $core = document.querySelector( '#calculator_content' ) ;
if ( $core ) {
	wp.element.render(<Calculator />, $core );
}