<?php

/**
 * @file
 * Process theme data.
 *
 * Use this file to run your theme specific implimentations of theme functions,
 * such preprocess, process, alters, and theme function overrides.
 *
 * Preprocess and process functions are used to modify or create variables for
 * templates and theme functions. They are a common theming tool in Drupal, often
 * used as an alternative to directly editing or adding code to templates. Its
 * worth spending some time to learn more about these functions - they are a
 * powerful way to easily modify the output of any template variable.
 * 
 * Preprocess and Process Functions SEE: http://drupal.org/node/254940#variables-processor
 * 1. Rename each function and instance of "adaptivetheme_subtheme" to match
 *    your subthemes name, e.g. if your theme name is "footheme" then the function
 *    name will be "footheme_preprocess_hook". Tip - you can search/replace
 *    on "grezan_theme".
 * 2. Uncomment the required function to use.
 */


/**
 * Preprocess variables for the html template.
 */
function grezan_theme_preprocess_html(&$vars) {
  global $theme_key;

  // add font awesome bootstrap
  drupal_add_html_head_link(array('href' => '//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css', 'rel' => 'stylesheet'));

  // make sure jQuery UI and effects is loaded for anonymous users
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'effects');

  // Browser/platform sniff - adds body classes such as ipad, webkit, chrome etc.
  $vars['classes_array'][] = css_browser_selector();

  // IE9 and greater gradient support
  /*
  $vars['polyfills']['gte IE 9'] = array(
    '#type' => 'markup',
    '#markup' => "<style type='text/css'> .gradient {filter: none;} </style>",
    '#prefix' => "<!--[if gte IE 9]>\n",
    '#suffix' => "\n<![endif]-->\n"
  );
  */
}
// */


/**
 * Process variables for the html template.
 */
/* -- Delete this line if you want to use this function
function grezan_theme_process_html(&$vars) {
}
// */


/**
 * Override or insert variables for the page templates.
 */
/* -- Delete this line if you want to use these functions
function grezan_theme_preprocess_page(&$vars) {
}
function grezan_theme_process_page(&$vars) {
}
// */


/**
 * Override or insert variables into the node templates.
 */
/* -- Delete this line if you want to use these functions
function grezan_theme_preprocess_node(&$vars) {
}
function grezan_theme_process_node(&$vars) {
}
// */


/**
 * Override or insert variables into the comment templates.
 */
/* -- Delete this line if you want to use these functions
function grezan_theme_preprocess_comment(&$vars) {
}
function grezan_theme_process_comment(&$vars) {
}
// */


/**
 * Override or insert variables into the block templates.
 */
/* -- Delete this line if you want to use these functions
function grezan_theme_preprocess_block(&$vars) {
}
function grezan_theme_process_block(&$vars) {
}
// */

