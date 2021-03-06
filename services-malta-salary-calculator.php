<?php
/**
 * Plugin Name:       Malte salary calculator
 * Description:       calcule de salaire a malte
 * Version:           1.0.0
 * Author:            ANDRIAMIHAJA Heldino
*/

if ( ! defined( 'ABSPATH' ) ) {
    die( 'No direct access!' );
}

class PageTemplater {

	private static $instance;

	protected $templates;

	public static function get_instance() {

		if ( null == self::$instance ) {
			self::$instance = new PageTemplater();
		} 

		return self::$instance;

	} 

	private function __construct() {

		$this->templates = array();

		if ( version_compare( floatval( get_bloginfo( 'version' ) ), '4.7', '<' ) ) {

			// 4.6 and older
			add_filter(
				'page_attributes_dropdown_pages_args',
				array( $this, 'register_project_templates' )
			);

		} else {

			// Add a filter to the wp 4.7 version attributes metabox
			add_filter(
				'theme_page_templates', array( $this, 'add_new_template' )
			);

		}

		// Add a filter to the save post to inject out template into the page cache
		add_filter(
			'wp_insert_post_data', 
			array( $this, 'register_project_templates' ) 
		);

		// Add a filter to the template include to determine if the page has our 
		// template assigned and return it's path
		add_filter(
			'template_include', 
			array( $this, 'view_project_template') 
		);


		// Add your templates to this array.
		$this->templates = array(
			'goodtobebad-template.php' => 'Malte calculator',
		);
			
	} 

	/**
	 * Adds our template to the page dropdown for v4.7+
	 *
	 */
	public function add_new_template( $posts_templates ) {
		$posts_templates = array_merge( $posts_templates, $this->templates );
		return $posts_templates;
	}

	/**
	 * Adds our template to the pages cache in order to trick WordPress
	 * into thinking the template file exists where it doens't really exist.
	 */
	public function register_project_templates( $atts ) {

		// Create the key used for the themes cache
		$cache_key = 'page_templates-' . md5( get_theme_root() . '/' . get_stylesheet() );

		// Retrieve the cache list. 
		// If it doesn't exist, or it's empty prepare an array
		$templates = wp_get_theme()->get_page_templates();
		if ( empty( $templates ) ) {
			$templates = array();
		} 

		// New cache, therefore remove the old one
		wp_cache_delete( $cache_key , 'themes');

		// Now add our template to the list of templates by merging our templates
		// with the existing templates array from the cache.
		$templates = array_merge( $templates, $this->templates );

		// Add the modified cache to allow WordPress to pick it up for listing
		// available templates
		wp_cache_add( $cache_key, $templates, 'themes', 1800 );

		return $atts;

	} 

	/**
	 * Checks if the template is assigned to the page
	 */
	public function view_project_template( $template ) {
		
		// Get global post
		global $post;

		// Return template if post is empty
		if ( ! $post ) {
			return $template;
		}

		// Return default template if we don't have a custom one defined
		if ( ! isset( $this->templates[get_post_meta( 
			$post->ID, '_wp_page_template', true 
		)] ) ) {
			return $template;
		} 

		$file = plugin_dir_path( __FILE__ ). get_post_meta( 
			$post->ID, '_wp_page_template', true
		);

		// Just to be safe, we check if the file exist first
		if ( file_exists( $file ) ) {
			return $file;
		} else {
			echo $file;
		}

		// Return template
		return $template;

	}

} 

//ajout dinamiquement de ce template de page a la page qui va utiliser cette applications  
add_action( 'plugins_loaded', array( 'PageTemplater', 'get_instance' ) );

function reactwp_scripts() {
	if ( !is_page_template('goodtobebad-template.php') ) 
		return !1;
  	wp_register_script(
		'reactwp-main-js-calculator',
		plugins_url( '/assets/js/main.js', __FILE__ ),
		['wp-element', 'wp-components']
	);
	wp_enqueue_script('reactwp-main-js-calculator');
}

add_action( 'wp_enqueue_scripts', 'reactwp_scripts' );

function reactwp_styles() {
	if ( !is_page_template('goodtobebad-template.php') ) 
		return !1;
	wp_register_style(
		'reactwp-bootstrap-css-calculator',
		plugins_url( '/assets/css/bootstrap.min.css', __FILE__ ),
		[],
		time(),
		'all'
	);
	wp_register_style(
	    'reactwp-main-css-calculator-style',
	    plugins_url( '/assets/css/main.css', __FILE__ ),
	    [],
	    time(),
	    'all'
	);
	wp_enqueue_style( 'wpb-google-fonts', 'https://fonts.googleapis.com/css?family=Crimson+Pro|Roboto&display=swap', false ); 
	wp_enqueue_style('reactwp-bootstrap-css-calculator'); 
	wp_enqueue_style('reactwp-main-css-calculator-style'); 

}

add_action( 'wp_enqueue_scripts', 'reactwp_styles' );