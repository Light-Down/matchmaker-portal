<?php

/**
 * Generates a URL for an asset with a version parameter for cache busting.
 * 
 * @param string $path The relative path to the asset (e.g., 'assets/css/style.css')
 * @return string The URL with the version parameter.
 */
function asset_url($path)
{
    $base_dir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    $local_path = ltrim($path, '/');
    if (file_exists($local_path)) {
        return $base_dir . '/' . $local_path . '?v=' . filemtime($local_path);
    }
    return $base_dir . '/' . $local_path;
}

/**
 * Output the page title.
 */
function page_title()
{
    global $page_title;
    if (isset($page_title)) {
        echo $page_title . ' | Tinder Fotoshooting';
    } else {
        echo 'Website 2B | Tinder Fotoshooting';
    }
}

/**
 * Output the meta description.
 */
function meta_description()
{
    global $meta_description;
    if (isset($meta_description)) {
        echo '<meta name="description" content="' . htmlspecialchars($meta_description) . '">';
    }
}
