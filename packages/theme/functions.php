<?php
/**
 * cwpt functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package cwpt
 */

 if ( ! defined( 'CWPT_VERSION' ) ) {
	/*
	 * Set the theme’s version number.
	 *
	 * This is used primarily for cache busting. If you use `npm run bundle`
	 * to create your production build, the value below will be replaced in the
	 * generated zip file with a timestamp, converted to base 36.
	 */
	define( 'CWPT_VERSION', '0.1.0' );
}

if ( ! function_exists( 'cwpt_default_colors' ) ) {
	function cwpt_default_colors() {
		return array(
			'background' => '#FFFFFF', //bg
			'foreground' => '#444444', //txt
			'primary'    => '#0000ff', //link
			'secondary'  => '#ff0000', //fg1
			'tertiary'   => null, //fg2
		);
	}
}

/**
 * cwpt only works in WordPress 4.7 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

if ( ! function_exists( 'cwpt_setup' ) ) :

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function cwpt_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on cwpt, use a find and replace
		 * to change 'cwpt' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'cwpt', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Enable appearance tools for Block Editor.
		add_theme_support( 'appearance-tools' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 1568, 9999 );

		// This theme uses wp_nav_menu() in two locations.
		register_nav_menus(
			array(
				'menu-1' => __( 'Primary', 'cwpt' ),
				'menu-2' => __( 'Footer Menu', 'cwpt' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Add support for Block Styles.
		add_theme_support( 'wp-block-styles' );

		// Add support for full and wide align images.
		add_theme_support( 'align-wide' );

		// Add support for editor styles.
		add_theme_support( 'editor-styles' );

		// Enqueue editor styles.
		add_editor_style( 'style-editor.css' );

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );
	}
endif;
add_action( 'after_setup_theme', 'cwpt_setup' );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function cwpt_widgets_init() {

	register_sidebar(
		array(
			'name'          => __( 'Footer', 'cwpt' ),
			'id'            => 'sidebar-1',
			'description'   => __( 'Add widgets here to appear in your footer.', 'cwpt' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

}
add_action( 'widgets_init', 'cwpt_widgets_init' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width Content width.
 */
function cwpt_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'cwpt_content_width', 750 );
}
add_action( 'after_setup_theme', 'cwpt_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function cwpt_scripts() {
	// Theme styles

	// YOU SHOULD COMMENT THIS LINE OUT
	wp_enqueue_style( 'cwpt-style', get_stylesheet_uri(), array(), CWPT_VERSION );
	
	wp_enqueue_style( 'cwpt-style',  get_template_directory_uri() . '/css/main.min.css', array(), CWPT_VERSION );
	wp_enqueue_script( 'cwpt-script', get_template_directory_uri() . '/js/main.min.js', array(), CWPT_VERSION, true );

	// Threaded comment reply styles
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

}
add_action( 'wp_enqueue_scripts', 'cwpt_scripts' );

/**
 * Add ability to show or hide header and footer elements on the homepage.
 */
function cwpt_customize_header_footer( $wp_customize ) {

	// Add setting to hide the site header on the homepage.
	$wp_customize->add_setting(
		'hide_site_header',
		array(
			'default'           => false,
			'type'              => 'theme_mod',
			'transport'         => 'refresh',
			'sanitize_callback' => 'cwpt_sanitize_checkbox',
		)
	);

	// Add control to hide the site header on the homepage.
	$wp_customize->add_control(
		'hide_site_header',
		array(
			'label'       => esc_html__( 'Hide the Site Header', 'cwpt' ),
			'description' => esc_html__( 'Check to hide the site header, if your homepage is set to display a static page.', 'cwpt' ),
			'section'     => 'static_front_page',
			'priority'    => 10,
			'type'        => 'checkbox',
			'settings'    => 'hide_site_header',
		)
	);

	// Add setting to hide footer elements on the homepage.
	$wp_customize->add_setting(
		'hide_site_footer',
		array(
			'default'           => false,
			'type'              => 'theme_mod',
			'transport'         => 'refresh',
			'sanitize_callback' => 'cwpt_sanitize_checkbox',
		)
	);

	// Add control to hide footer elements on the homepage.
	$wp_customize->add_control(
		'hide_site_footer',
		array(
			'label'       => esc_html__( 'Hide the Site Footer Menu & Widgets', 'cwpt' ),
			'description' => esc_html__( 'Check to hide the site menu & widgets in the footer, if your homepage is set to display a static page.', 'cwpt' ),
			'section'     => 'static_front_page',
			'priority'    => 10,
			'type'        => 'checkbox',
			'settings'    => 'hide_site_footer',
		)
	);
}
add_action( 'customize_register', 'cwpt_customize_header_footer' );

/**
 * Enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Custom template tags for the theme.
 */
require get_template_directory() . '/inc/template-tags.php';
