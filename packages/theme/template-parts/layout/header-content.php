<?php
/**
 * The header for our theme
 *
 * This is the template that displays the `head` element and everything up
 * until the `#content` element.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package cwpt
 */

?>
<header id="masthead" class="site-header responsive-max-width">
  <div class="site-branding">
    <?php if ( is_front_page() && is_home() ) : ?>
      <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
    <?php else : ?>
      <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
    <?php endif; ?>
  </div>

  <?php 
    $has_primary_nav       = has_nav_menu( 'menu-1' );
    $has_primary_nav_items = wp_nav_menu(
      array(
        'theme_location' => 'menu-1',
        'fallback_cb'    => false,
        'echo'           => false,
      )
    );

    if ( $has_primary_nav && $has_primary_nav_items ) : 
  ?>
    <nav id="site-navigation" class="main-navigation" aria-label="<?php esc_attr_e( 'Main Navigation', 'cwpt' ); ?>">

      <input type="checkbox" role="button" aria-haspopup="true" id="toggle" class="hide-visually">
      <label for="toggle" id="toggle-menu" class="button">
        <?php _e( 'Menu', 'cwpt' ); ?>
        <span class="dropdown-icon open">+</span>
        <span class="dropdown-icon close">&times;</span>
        <span class="hide-visually expanded-text"><?php _e( 'expanded', 'cwpt' ); ?></span>
        <span class="hide-visually collapsed-text"><?php _e( 'collapsed', 'cwpt' ); ?></span>
      </label>

      <?php
        $main_nav_args = array(
          'theme_location' => 'menu-1',
          'menu_class'     => 'main-menu',
          'items_wrap'     => '<ul id="%1$s" class="%2$s" aria-label="submenu">%3$s</ul>',
        );
        if ( get_theme_mod( 'enable_side_menu' ) === 1 ) {
          $main_nav_args['container_class'] = 'main-menu-container';
        }
        wp_nav_menu( $main_nav_args );
      ?>
    </nav><!-- #site-navigation -->
  <?php endif; ?>
</header>