<?php

/**
 * Plugin Name: Nova Step Plugin
 * Description: Оформление заказа в три шага.
 * Version: 0.1
 * Author: Ivan Meshcheryakov
 * Author URI: https://vk.com/ivan_meshcheryakov
 * Text Domain: nova_step
 * Domain Path: /lang
 */



function nova_step_admin_settings_init() {
    register_setting('novastep', 'novastep_setting_name');

    add_settings_section(
        'novastep_settings_section',
        'Заголовок секции',
        'wporg_settings_section_callback',
        'novastep'
    );

    add_settings_field(
        'support_clean',
        'Поддерживающая уборка', 'wporg_settings_field_callback',
        'novastep',
        'novastep_settings_section'
    );

    add_settings_field(
        'main_clean',
        'Генеральная уборка', 'wporg_settings_field_callback2',
        'novastep',
        'novastep_settings_section'
    );

    add_settings_field(
        'post-construction_clean',
        'Послестроительная уборка', 'wporg_settings_field_callback3',
        'novastep',
        'novastep_settings_section'
    );   
}

add_action('admin_init', 'nova_step_admin_settings_init');

function wporg_settings_field_callback() {
    // get the value of the setting we've registered with register_setting()
    $setting = get_option('novastep_setting_name');
    // output the field
    ?>
    <!-- <input type="number" name="novastep_setting_name" value="<?php echo isset( $setting['support_clean'] ) ? esc_attr( $setting ) : ''; ?>"> -->
    <input type="number" name="novastep_setting_name[support_clean]" value="<?php echo $setting['support_clean']?>">
    <?php
}

function wporg_settings_field_callback2() {
    // get the value of the setting we've registered with register_setting()
    $setting = get_option('novastep_setting_name');
    // output the field
    ?>
    <input type="number" name="novastep_setting_name[main_clean]" value="<?php echo $setting['main_clean'] ?>">
    <?php
}

function wporg_settings_field_callback3() {
    // get the value of the setting we've registered with register_setting()
    $setting = get_option('novastep_setting_name');
    // output the field
    ?>
    <input type="number" name="novastep_setting_name[post-construction_clean]" value="<?php echo $setting['post-construction_clean'] ?>">
    <?php
}

function wporg_settings_section_callback() {
    echo '<p>WPOrg Section Introduction.</p>';
}

function nova_step_add_to_admin_panel() {
    $hookname = add_menu_page(
        esc_html__( 'Nova Step Меню', 'nova_step' ),
        esc_html__('Nova Step Меню', 'nova_step'),
        'manage_options',
        'novastep',
        'nova_step_show_content',
        'dashicons-editor-ol',
        59
    );
    // add_action('load-' . $hookname, 'nova_step_admin_submit');
}

add_action('admin_menu', 'nova_step_add_to_admin_panel');

// Админ страница

function nova_step_show_content() {
    require_once('adminview.php');
}

// function nova_step_admin_submit() {
//     if('POST' === $_SERVER['REQUEST_METHOD']) {
        
//     }
// }


// Регистрация скриптов и стилей (админ)
function nova_step_register_admin_assets() {
    wp_register_style('nova_step_admin-styles', plugins_url('assets/css/admin.css', __FILE__));
    wp_register_script('nova_step_scripts', plugins_url('assets/js/admin.js', __FILE__), array('jquery'), null, true);
}
add_action('admin_enqueue_scripts', 'nova_step_register_admin_assets');

// Подключение скриптов и стилей (админ)

function nova_step_load_assets($hook) {
    if($hook != 'toplevel_page_novastep') {
            return;
    }
    wp_enqueue_style('nova_step_admin-styles');
    wp_enqueue_script('nova_step_scripts');
}
add_action('admin_enqueue_scripts', 'nova_step_load_assets');

// Регистрация скриптов и стилей 

add_action('wp_enqueue_scripts', 'callback_for_setting_up_scripts');
function callback_for_setting_up_scripts() {
    wp_register_style( 'namespace', plugins_url('assets/css/main.css', __FILE__));
    wp_enqueue_style( 'namespace' );
    wp_enqueue_script( 'namespaceformyscript', plugins_url('/assets/js/main.js', __FILE__), array( 'jquery' ));
}






/**
 * The [wporg] shortcode.  Accepts a title and will display a box.
 *
 * @param array  $atts     Shortcode attributes. Default empty.
 * @param atring $content  Shortcode content. Default null.
 * @param string $tag      Shortcode tag (name). Default empty.
 *
 * @return string
 */
function wporg_shortcode_main() {
    ob_start();
    require('mainview.php');
    return ob_get_clean();
}

function wporg_shortcode_vidget() {
    ob_start();
    require('vidgetview.html');
    return ob_get_clean();
}

/**
 * Central location to create all shortcodes.
 */
function wporg_shortcodes_init() {
    add_shortcode( 'novastep_main', 'wporg_shortcode_main' );
    add_shortcode( 'novastep_vidget', 'wporg_shortcode_vidget' );
}
 
add_action( 'init', 'wporg_shortcodes_init' );

 ?>