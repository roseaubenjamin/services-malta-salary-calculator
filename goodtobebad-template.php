<?php
/*
 * Template Name: Thame salary calculator
 * Description: ...
 */
get_header(); ?>

<div class="site-content" style="width: 100%; height: auto;">
  	<div id="content-calculator" class="container" role="main">
<?php while ( have_posts() ) : the_post(); ?>
	  	<header class="entry-header">
	    	<h1 class="entry-title" style="text-align: center;"><?php the_title(); ?></h1>
	  	</header>

	  	<div class="entry-content">
	    	<div class="content-desc" style="text-align: center;"><?php the_content(); ?></div>
	    	<div id="calculator_content">Chargement...</div>
	  	</div> 
		<?php endwhile; ?>
 	</div> 
</div>
<?
get_footer();
