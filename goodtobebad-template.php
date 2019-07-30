<?php
/*
 * Template Name: Thame salary calculator
 * Description: ...
 */
get_header(); ?>

<div id="primary" class="site-content">
  	<div id="content" role="main">
<?php while ( have_posts() ) : the_post(); ?>
	  	<header class="entry-header">
	    	<h1 class="entry-title"><?php the_title(); ?></h1>
	  	</header>

	  	<div class="entry-content">
	    	<?php the_content(); ?>
	    	<div id="calculator_content">OOOOOOOOOOOOO</div>
	  	</div> 
		<?php endwhile; ?>
 	</div> 
</div>
<?
get_footer();
