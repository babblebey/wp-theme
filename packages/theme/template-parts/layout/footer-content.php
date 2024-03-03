<footer id="colophon" class="site-footer responsive-max-width">
	<?php
	if ( is_active_sidebar( 'sidebar-1' ) ) : ?>

		<aside class="widget-area responsive-max-width" role="complementary" aria-label="<?php esc_attr_e( 'Footer', 'cwpt' ); ?>">
			<?php
			if ( is_active_sidebar( 'sidebar-1' ) ) {
				dynamic_sidebar( 'sidebar-1' );
			}
			?>
		</aside><!-- .widget-area -->
	
	<?php endif;

	if ( ! ( true === get_theme_mod( 'hide_site_footer', false ) && is_front_page() && is_page() ) ) : // If this is the homepage and the footer elements are set to hide, don't load this part.
		if ( has_nav_menu( 'menu-2' ) ) : ?>
			<nav class="footer-navigation" aria-label="<?php esc_attr_e( 'Footer Menu', 'cwpt' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-2',
						'menu_class'     => 'footer-menu',
						'depth'          => 1,
					)
				);
				?>
			</nav><!-- .footer-navigation -->
		<?php endif;
	endif; ?>

	<div class="site-info">
	<?php $blog_info = get_bloginfo( 'name' );
		if ( ! empty( $blog_info ) ) : ?>
		<a class="site-name" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a><span class="comma">,</span>
	<?php endif; 
		/* translators: 1: WordPress link, 2: WordPress. */
		printf(
			'<a href="%1$s" class="imprint">proudly powered by %2$s</a>.',
			esc_url( __( 'https://wordpress.org/', 'cwpt' ) ),
			'WordPress'
		);
	?>
	</div>
</footer><!-- #colophon -->
