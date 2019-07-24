<?php
/**
 * Plugin Name:       Malte salary calculator
 * Description:       calcule de salaire a malte
 * Version:           1.0.0
 * Author:            Heldino
*/

if ( ! defined( 'ABSPATH' ) ) {
    die( 'No direct access!' );
}

function formCalculage(){
	wp_enqueue_script('reactwp-main-js-calculator');  
    wp_enqueue_style('reactwp-main-js-calculator-style'); 
	?>
	<div id="calculator_content"></div>
	<?php
}

add_action( 'after_setup_theme', 'mts_wpshortcodes_add' );

function mts_wpshortcodes_add() {
    remove_shortcode('form_creation'); add_shortcode('form_creation', 'formCalculage');
}

function reactwp_scripts() {
  	wp_register_script(
		'reactwp-main-js-calculator',
		plugins_url( '/assets/js/main.js', __FILE__ ),
		['wp-element', 'wp-components'],
		time(),
		true
	);
}

add_action( 'wp_enqueue_scripts', 'reactwp_scripts' );

function reactwp_styles() {
	wp_register_style(
	    'reactwp-main-js-calculator-style',
	    plugins_url( '/assets/css/main.css', __FILE__ ),
	    [],
	    time(),
	    'all'
	);
}

add_action( 'wp_enqueue_scripts', 'reactwp_styles' );