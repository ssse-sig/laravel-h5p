<?php

namespace App\View\Components;

use Illuminate\Support\Facades\DB;
use Illuminate\View\Component;

/**
 * H5P Plugin.
 *
 * @package   H5P
 * @author    Joubel <contact@joubel.com>
 * @license   MIT
 * @link      http://joubel.com
 * @copyright 2014 Joubel
 */

/**
 * H5P Content Admin class
 *
 * @package H5P_Plugin_Admin
 * @author Joubel <contact@joubel.com>
 */
class H5PContentAdmin extends  Component{

    /**
     * @since 1.1.0
     */
    private $plugin_slug = NULL;

    /**
     * Editor instance
     *
     * @since 1.1.0
     * @var \H5peditor
     */
    protected static $h5peditor = NULL;

    /**
     * Keep track of the current content.
     *
     * @since 1.1.0
     */
    public $content = NULL;
//    private $content = NULL;

    /**
     * Are we inserting H5P content on this page?
     *
     * @since 1.2.0
     */
    private $insertButton = FALSE;

    /**
     * Initialize content admin and editor
     *
     * @since 1.1.0
     * @param string $plugin_slug
     */
    public function __construct($plugin_slug) {
        $this->plugin_slug = $plugin_slug;
    }

    /**
     * Load content and alter page title for certain pages.
     *
     * @since 1.1.0
     * @param string $page
     * @param string $admin_title
     * @param string $title
     * @return string
     */
    public function alter_title($page, $admin_title, $title) {
        $task = filter_input(INPUT_GET, 'task', FILTER_SANITIZE_STRING);
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

        // Find content title
        $show = ($page === 'h5p' && ($task === 'show' || $task === 'results'));
        $edit = ($page === 'h5p_new');
        if (($show || $edit) && $id !== NULL) {
            if ($this->content === NULL) {
                $this->load_content($id);
            }

            if (!is_string($this->content)) {
                if ($edit) {
                    $admin_title = str_replace($title, 'Edit', $admin_title);
                }
                $admin_title = esc_html($this->content['title']) . ' &lsaquo; ' . $admin_title;
            }
        }

        return $admin_title;
    }

    /**
     * Will load and set the content variable.
     * Also loads tags related to content.
     *
     * @param int $id
     * @throws \Exception
     * @since 1.6.0
     */
//    private function load_content($id) {
    public function load_content($id) {
        global $wpdb;
        $plugin = H5P_Plugin::get_instance();

        $this->content = $plugin->get_content($id);
        if (!is_string($this->content)) {
//            $tags = $wpdb->get_results($wpdb->prepare(
//                "SELECT t.name
//             FROM {$wpdb->prefix}h5p_contents_tags ct
//             JOIN {$wpdb->prefix}h5p_tags t ON ct.tag_id = t.id
//            WHERE ct.content_id = %d",
//                $id
//            ));
            $tags = DB::table('wp_h5p_contents_tags as ct')
                ->select('t.name')
                ->join('wp_h5p_tags as t','ct.tag_id',  't.id')
                ->where('ct.content_id', $id)->get();
            $this->content['tags'] = '';
            foreach ($tags as $tag) {
                $this->content['tags'] .= ($this->content['tags'] !== '' ? ', ' : '') . $tag->name;
            }
        }
    }

    /**
     * Permission check. Can the current user edit the given content?
     *
     * @since 1.1.0
     * @param array $content
     * @return boolean
     */
    private function current_user_can_edit($content) {
//        // If you can't edit content, you neither can edit others contents
////        if (!current_user_can('edit_h5p_contents')) {
////            return FALSE;
////        }
////        if (current_user_can('edit_others_h5p_contents')) {
////            return TRUE;
////        }
////        $author_id = (int)(is_array($content) ? $content['user_id'] : $content->user_id);
////        return get_current_user_id() === $author_id;
        return true;
    }

    /**
     * Permission check. Can the current user view the given content?
     *
     * @since 1.15.0
     * @param array $content
     * @return boolean
     */
    private function current_user_can_view($content) {
        // If you can't view content, you neither can view others contents
        if (! current_user_can('view_h5p_contents')) {
            return FALSE;
        }

        // If user is allowed to view others' contents, can also see content in general
        if (current_user_can('view_others_h5p_contents')) {
            return TRUE;
        }

        // Does content belong to current user?
        $author_id = (int)(is_array($content) ? $content['user_id'] : $content->user_id);
        return get_current_user_id() === $author_id;
    }

    /**
     * Permission check. Can the current user view results for the given content?
     *
     * @since 1.2.0
     * @param array $content
     * @return boolean
     */
    private function current_user_can_view_content_results($content) {
        if (!get_option('h5p_track_user', TRUE)) {
            return FALSE;
        }

        return $this->current_user_can_edit($content);
    }

    /**
     * Display a list of all h5p content.
     *
     * @since 1.1.0
     */
    public function display_contents_page() {
        switch (filter_input(INPUT_GET, 'task', FILTER_SANITIZE_STRING)) {
            case NULL:
                include_once('views/contents.php');

                $headers = array(
                    (object) array(
                        'text' => __('Title', $this->plugin_slug),
                        'sortable' => TRUE
                    ),
                    (object) array(
                        'text' => __('Content type', $this->plugin_slug),
                        'sortable' => TRUE,
                        'facet' => TRUE
                    ),
                    (object) array(
                        'text' => __('Author', $this->plugin_slug),
                        'sortable' => TRUE,
                        'facet' => TRUE
                    ),
                    (object) array(
                        'text' => __('Tags', $this->plugin_slug),
                        'sortable' => FALSE,
                        'facet' => TRUE
                    ),
                    (object) array(
                        'text' => __('Last modified', $this->plugin_slug),
                        'sortable' => TRUE
                    ),
                    (object) array(
                        'text' => __('ID', $this->plugin_slug),
                        'sortable' => TRUE
                    )
                );
                if (get_option('h5p_track_user', TRUE)) {
                    $headers[] = (object) array(
                        'class' => 'h5p-results-link'
                    );
                }
                $headers[] = (object) array(
                    'class' => 'h5p-edit-link'
                );

                $plugin_admin = H5P_Plugin_Admin::get_instance();
                $plugin_admin->print_data_view_settings(
                    'h5p-contents',
                    admin_url('admin-ajax.php?action=h5p_contents'),
                    $headers,
                    array(true),
                    __("No H5P content available. You must upload or create new content.", $this->plugin_slug),
                    (object) array(
                        'by' => 4,
                        'dir' => 0
                    )
                );
                return;

            case 'show':
                // Access restriction
                if ($this->current_user_can_view($this->content) == FALSE) {
                    H5P_Plugin_Admin::set_error(__('You are not allowed to view this content.', $this->plugin_slug));
                    H5P_Plugin_Admin::print_messages();
                    return;
                }

                // Admin preview of H5P content.
                if (is_string($this->content)) {
                    H5P_Plugin_Admin::set_error($this->content);
                    H5P_Plugin_Admin::print_messages();
                }
                else {
                    $plugin = H5P_Plugin::get_instance();
                    $embed_code = $plugin->add_assets($this->content);
                    include_once('views/show-content.php');
//                    dd('test');
                    H5P_Plugin::get_instance()->add_settings();

                    // Log view
                    new H5P_Event('content', NULL,
                        $this->content['id'],
                        $this->content['title'],
                        $this->content['library']['name'],
                        $this->content['library']['majorVersion'] . '.' . $this->content['library']['minorVersion']);
                }
                return;

            case 'results':
                // View content results
                if (is_string($this->content)) {
                    H5P_Plugin_Admin::set_error($this->content);
                    H5P_Plugin_Admin::print_messages();
                }
                else {
                    // Print HTML
                    include_once('views/content-results.php');
                    $plugin_admin = H5P_Plugin_Admin::get_instance();
                    $plugin_admin->print_data_view_settings(
                        'h5p-content-results',
                        admin_url('admin-ajax.php?action=h5p_content_results&id=' . $this->content['id']),
                        array(
                            (object) array(
                                'text' => __('User', $this->plugin_slug),
                                'sortable' => TRUE
                            ),
                            (object) array(
                                'text' => __('Score', $this->plugin_slug),
                                'sortable' => TRUE
                            ),
                            (object) array(
                                'text' => __('Maximum Score', $this->plugin_slug),
                                'sortable' => TRUE
                            ),
                            (object) array(
                                'text' => __('Opened', $this->plugin_slug),
                                'sortable' => TRUE
                            ),
                            (object) array(
                                'text' => __('Finished', $this->plugin_slug),
                                'sortable' => TRUE
                            ),
                            __('Time spent', $this->plugin_slug)
                        ),
                        array(true),
                        __("There are no logged results for this content.", $this->plugin_slug),
                        (object) array(
                            'by' => 4,
                            'dir' => 0
                        )
                    );

                    // Log content result view
                    new H5P_Event('results', 'content',
                        $this->content['id'],
                        $this->content['title'],
                        $this->content['library']['name'],
                        $this->content['library']['majorVersion'] . '.' . $this->content['library']['minorVersion']);
                }
                return;
        }

        print '<div class="wrap"><h2>' . esc_html__('Unknown task.', $this->plugin_slug) . '</h2></div>';
    }

    /**
     * Handle form submit when uploading, deleting or editing H5Ps.
     * TODO: Rename to process_content_form ?
     *
     * @since 1.1.0
     */
    public function process_new_content($echo_on_success) {
        $plugin = H5P_Plugin::get_instance();
//        dd($echo_on_success);

//        $consent = filter_input(INPUT_POST, 'consent', FILTER_VALIDATE_BOOLEAN);
//
//        if ($consent !== NULL && !get_option('h5p_has_request_user_consent', FALSE) && current_user_can('manage_options')) {
//            check_admin_referer('h5p_consent', 'can_has'); // Verify form
//            update_option('h5p_hub_is_enabled', $consent);
//            update_option('h5p_send_usage_statistics', $consent);
//            update_option('h5p_has_request_user_consent', TRUE);
//        }

        // Check if we have any content or errors loading content
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

        if ($id) {
            $this->load_content($id);
//            dd($this->content);
            if (is_string($this->content)) {
                H5P_Plugin_Admin::set_error($this->content);
                $this->content = NULL;
            }
        }
//        dd($this->content);
        if ($this->content !== NULL) {
            // We have existing content

            if (!$this->current_user_can_edit($this->content)) {
                // The user isn't allowed to edit this content
                H5P_Plugin_Admin::set_error(__('You are not allowed to edit this content.', $this->plugin_slug));
                return;
            }

            // Check if we're deleting content

            $delete = filter_input(INPUT_GET, 'delete');
            if ($delete) {
//                if (wp_verify_nonce($delete, 'deleting_h5p_content')) {
                if (true) {

                    $this->set_content_tags($this->content['id']);

                    $storage = $plugin->get_h5p_instance('storage');

                    $storage->deletePackage($this->content);

                    // Log content delete
                    new H5P_Event('content', 'delete',
                        $this->content['id'],
                        $this->content['title'],
                        $this->content['library']['name'],
                        $this->content['library']['major_version'] . '.' . $this->content['library']['minor_version']);
                    return;
                }
                H5P_Plugin_Admin::set_error(__('Invalid confirmation code, not deleting.', $this->plugin_slug));
            }
        }


        // Check if we're uploading or creating content
        $action = filter_input(INPUT_POST, 'action', FILTER_VALIDATE_REGEXP, array('options' => array('regexp' => '/^(upload|create)$/')));
//        dd($action);
        if ($action) {
//          check_admin_referer('h5p_content', 'yes_sir_will_do'); // Verify form
            $core = $plugin->get_h5p_instance('core'); // Make sure core is loaded

            $result = FALSE;
            if ($action === 'create') {
                // Handle creation of new content.
//                dd($this->content);
                $result = $this->handle_content_creation($this->content);
//                dd($core);
                $core->filterParameters($result);
                $result = $result['id'];
                $echo_on_success = false;
//                dd($result);
            }
            elseif (isset($_FILES['h5p_file']) && $_FILES['h5p_file']['error'] === 0) {
                // Create new content if none exists
                $content = ($this->content === NULL ? array('disable' => H5PCore::DISABLE_NONE) : $this->content);
                $content['uploaded'] = true;
                $this->get_disabled_content_features($core, $content);

                // Handle file upload
                $plugin_admin = H5P_Plugin_Admin::get_instance();
                $result = $plugin_admin->handle_upload($content);
            }
//            dd($result);
            if ($result) {
                $content['id'] = $result;
                $this->set_content_tags($content['id'], filter_input(INPUT_POST, 'tags'));


                if (empty($echo_on_success)) {
//                    echo 'creazione effettuata con successo';
//                    return redirect('https://h5pdawp2.test/contents');
                    return $content['id'];

                }
                else {
                    echo $echo_on_success;
                }
//                dd('test 2');
//                exit;
            }
        }
    }

    /**
     * Save tags for given content.
     * Removes unused tags.
     *
     * @param int $content_id
     * @param string $tags
     */
    private function set_content_tags($content_id, $tags = '') {
        global $wpdb;
        $tag_ids = array();

        // Create array and trim input
        $tags = explode(',', $tags);
        foreach ($tags as $tag) {
            $tag = trim($tag);
            if ($tag === '') {
                continue;
            }

            // Find out if tag exists and is linked to content
            $exists = $wpdb->get_row($wpdb->prepare(
                "SELECT t.id, ct.content_id
             FROM {$wpdb->prefix}h5p_tags t
        LEFT JOIN {$wpdb->prefix}h5p_contents_tags ct ON ct.content_id = %d AND ct.tag_id = t.id
            WHERE t.name = %s",
                $content_id, $tag
            ));

            if (empty($exists)) {
                // Create tag
                $exists = array('name' => $tag);
                $wpdb->insert("{$wpdb->prefix}h5p_tags", $exists, array('%s'));
                $exists = (object) $exists;
                $exists->id = $wpdb->insert_id;
            }
            $tag_ids[] = $exists->id;

            if (empty($exists->content_id)) {
                // Connect to content
                $wpdb->insert("{$wpdb->prefix}h5p_contents_tags", array('content_id' => $content_id, 'tag_id' => $exists->id), array('%d', '%d'));
            }
        }

        // Remove tags that are not connected to content (old tags)
//        $and_where = empty($tag_ids) ? '' : " AND tag_id NOT IN (". implode(',', $tag_ids) .")";
//        $wpdb->query("DELETE FROM {$wpdb->prefix}h5p_contents_tags WHERE content_id = {$content_id}{$and_where}");

        // Maintain tags table by remove unused tags
        $test = DB::table('wp_h5p_tags as t')
            ->leftJoin('wp_h5p_contents_tags as ct','t.id','ct.tag_id')
            ->whereNull('ct.content_id')
            ->delete();


//        $wpdb->query("DELETE t.* FROM
//{$wpdb->prefix}h5p_tags t LEFT JOIN
//{$wpdb->prefix}h5p_contents_tags ct
//ON t.id = ct.tag_id WHERE ct.content_id IS NULL");
//
    }

    /**
     * Display a form for adding and editing h5p content.
     *
     * @since 1.1.0
     */
    public function display_new_content_page($custom_view) {
//        dd('test');
////        if (!get_option('h5p_has_request_user_consent', FALSE) && current_user_can('manage_options')) {
//            // Get the user to enable the Hub before creating content
//            return include_once('views/user-consent.php');
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

        if ($id) {
            $this->load_content($id);
//            dd($this->content);
            if (is_string($this->content)) {
                H5P_Plugin_Admin::set_error($this->content);
                $this->content = NULL;
            }
        }

//            dd($this->content);

        $contentExists = ($this->content !== NULL && !is_string($this->content));
//        dd($contentExists);
        $hubIsEnabled = true;
//      $hubIsEnabled = get_option('h5p_hub_is_enabled', TRUE);
        $plugin = H5P_Plugin::get_instance();
        $core = $plugin->get_h5p_instance('core');
        // Prepare form
        $library = $this->get_input('library', $contentExists ? H5PCore::libraryToString($this->content['library']) : 0);
//        dd($library);
//        dd($contentExists);
//        dd($this->content);
        $parameters = $this->get_input('parameters', '{"params":' . ($contentExists ? $core->filterParameters($this->content) : '{}') . ',"metadata":' . ($contentExists ? json_encode((object)$this->content['metadata']) : '{}') . '}');
//        dd($parameters);
//        dd($core->filterParameters($this->content));
        // Determine upload or create
//        dd(!$hubIsEnabled && !$contentExists && !$this->has_libraries());
        if (!$hubIsEnabled && !$contentExists && !$this->has_libraries()) {
            $upload = TRUE;
            $examplesHint = TRUE;
        }
        else {
            $upload = (filter_input(INPUT_POST, 'action') === 'upload');
            $examplesHint = FALSE;
        }


        // Filter/escape parameters, double escape that is...
//        $safe_text = wp_check_invalid_utf8($parameters);
//        $safe_text = _wp_specialchars($safe_text, ENT_QUOTES, false, true)
//        $parameters = apply_filters('attribute_escape', $safe_text, $parameters);
        $parameters = str_replace("\r", "", $parameters);
        $parameters = str_replace("\n", "", $parameters);

//        $parameters = str_replace("<p>", "",$parameters);
//        $parameters = str_replace("<p>", "",$parameters);
//        dd($parameters);

        $display_options = $core->getDisplayOptionsForEdit($contentExists ? $this->content['disable'] : NULL);

        // allows for customization of the editor's view$
//        $scripts = [];
//        $scripts [0]= H5P_Plugin_Admin::add_script('jquery', 'h5p-php-library/js/jquery.js');
//        $scripts [1]= H5P_Plugin_Admin::add_script('disable', 'h5p-php-library/js/h5p-display-options.js');
//        $scripts [2]= H5P_Plugin_Admin::add_script('toggle', 'admin/scripts/h5p-toggle.js');
        $scripts = [];
        $scripts[0] = H5P_Plugin_Admin::add_script('jquery', 'h5p-php-library/js/jquery.js');
        $scripts[1] = H5P_Plugin_Admin::add_script('disable', 'h5p-php-library/js/h5p-display-options.js');
        $scripts[2] = H5P_Plugin_Admin::add_script('toggle', 'admin/scripts/h5p-toggle.js');

//        print '<script src="'. $scripts[0] .'" type="text/javascript" defer=""></script>';
//        print '<script src="'. $scripts[1] .'" type="text/javascript" defer=""></script>';
//        print '<script src="'. $scripts[2] .'" type="text/javascript" defer="" media="all></script>';

//       include_once(empty($custom_view) ? 'h5p/admin/views/new-content.php' : $custom_view);

        include_once('h5p/admin/views/new-content.php');

        $this->add_editor_assets($contentExists ? $this->content['id'] : NULL);
//        dd($contentExists);
        // Log editor opened
        if ($contentExists) {
            new H5P_Event('content', 'edit',
                $this->content['id'],
                $this->content['title'],
                $this->content['library']['name'],
                $this->content['library']['major_version'] . '.' . $this->content['library']['minor_version']);
        }
        else {
            new H5P_Event('content', 'new');
        }
    }

    /**
     * Check to see if the installation has any libraries.
     *
     * @since 1.5.2
     * @global \wpdb $wpdb
     * @return bool
     */
    private function has_libraries() {
        global $wpdb;

        return $wpdb->get_var("SELECT id FROM {$wpdb->prefix}h5p_libraries WHERE runnable = 1 LIMIT 1") !== NULL;
    }

    /**
     * Create new content.
     *
     * @since 1.1.0
     * @param array $content
     * @return mixed
     */
    private function handle_content_creation($content) {
//            dd($content);
        $plugin = H5P_Plugin::get_instance();
        $core = $plugin->get_h5p_instance('core');

        // Keep track of the old library and params
        $oldLibrary = NULL;
        $oldParams = NULL;
        if ($content !== NULL) {
            $oldLibrary = $content['library'];
            $oldParams = json_decode($content['params']);
        }
        else {
            $content = array(
                'disable' => H5PCore::DISABLE_NONE
            );
        }

        // Get library
        $content['library'] = $core->libraryFromString($this->get_input('library'));
//        dd($content);
        if (!$content['library']) {
            $core->h5pF->setErrorMessage(__('Invalid library.', $this->plugin_slug));
            return FALSE;
        }
        if ($core->h5pF->libraryHasUpgrade($content['library'])) {
            // We do not allow storing old content due to security concerns
            $core->h5pF->setErrorMessage(__('Something unexpected happened. We were unable to save this content.', $this->plugin_slug));
            return FALSE;
        }
//        dd($content);

        // Check if library exists.
        $content['library']['libraryId'] = $core->h5pF->getLibraryId($content['library']['name'], $content['library']['major_version'], $content['library']['minor_version']);
//        dd($content);
//        dd($content['library']['libraryId']);
        if (!$content['library']['libraryId']) {
            $core->h5pF->setErrorMessage(__('No such library.', $this->plugin_slug));
            return FALSE;
        }

        // Check parameters
        $content['params'] = $this->get_input('parameters');
//        dd($content);
        if ($content['params'] === NULL) {
            return FALSE;
        }
        $params = json_decode($content['params']);
        if ($params === NULL) {
            $core->h5pF->setErrorMessage(__('Invalid parameters.', $this->plugin_slug));
            return FALSE;
        }

        $content['params'] = json_encode($params->params);
        $content['metadata'] = $params->metadata;
//        dd($content);
        // Trim title and check length
        $trimmed_title = empty($content['metadata']->title) ? '' : trim($content['metadata']->title);
        if ($trimmed_title === '') {
            H5P_Plugin_Admin::set_error(sprintf(__('Missing %s.', $this->plugin_slug), 'title'));
            return FALSE;
        }

        if (strlen($trimmed_title) > 255) {
            H5P_Plugin_Admin::set_error(__('Title is too long. Must be 256 letters or shorter.', $this->plugin_slug));
            return FALSE;
        }


        // Set disabled features
        $this->get_disabled_content_features($core, $content);

        try {
            // Save new content
            $content['id'] = $core->saveContent($content);
        }
        catch (Exception $e) {
            H5P_Plugin_Admin::set_error($e->getMessage());
            return;
        }

        // Move images and find all content dependencies
        $editor = $this->get_h5peditor_instance();
//        dd($editor);
//        dd($params->params);
//        dd(H5PCore::libraryToString($params->params));
//        dd($oldLibrary);
        $editor->processParameters($content['id'], $content['library'], $params->params, $oldLibrary, $oldParams);

        //        dd($content);
        return $content;
    }

    /**
     * Extract disabled content features from input post.
     *
     * @since 1.2.0
     * @param H5PCore $core
     * @param int $current
     * @return int
     */
    private function get_disabled_content_features($core, &$content) {
        $set = array(
            H5PCore::DISPLAY_OPTION_FRAME => filter_input(INPUT_POST, 'frame', FILTER_VALIDATE_BOOLEAN),
            H5PCore::DISPLAY_OPTION_DOWNLOAD => filter_input(INPUT_POST, 'download', FILTER_VALIDATE_BOOLEAN),
            H5PCore::DISPLAY_OPTION_EMBED => filter_input(INPUT_POST, 'embed', FILTER_VALIDATE_BOOLEAN),
            H5PCore::DISPLAY_OPTION_COPYRIGHT => filter_input(INPUT_POST, 'copyright', FILTER_VALIDATE_BOOLEAN),
        );
        $content['disable'] = $core->getStorableDisplayOptions($set, $content['disable']);
    }

    /**
     * Get input post data field.
     *
     * @since 1.1.0
     * @param string $field The field to get data for.
     * @param string $default Optional default return.
     * @return string
     */
    private function get_input($field, $default = NULL) {
        // Get field
        $value = filter_input(INPUT_POST, $field);
        if ($value === NULL) {
            if ($default === NULL) {
                // No default, set error message.
                H5P_Plugin_Admin::set_error(sprintf(__('Missing %s.', $this->plugin_slug), $field));
            }
            return $default;
        }

        return $value;
    }

    /**
     * Add custom media button for selecting H5P content.
     *
     * @since 1.1.0
     * @param string $editor_id
     */
    public function add_insert_button($editor_id = 'content') {
        $this->insertButton = TRUE;

        printf('<button type="button" id="add-h5p" class="button" title="%s" data-method="%s">%s</button>',
            __('Insert interactive content', $this->plugin_slug),
            get_option('h5p_insert_method', 'id'),
            __('Add H5P', $this->plugin_slug)
        );
    }

    /**
     * Adds scripts and settings for allowing selection of H5P contents when
     * inserting into pages, posts etc.
     *
     * @since 1.2.0
     */
    public function print_insert_content_scripts() {
        if (!$this->insertButton) {
            return;
        }

        $plugin_admin = H5P_Plugin_Admin::get_instance();
        $plugin_admin->print_data_view_settings(
            'h5p-insert-content',
            admin_url('admin-ajax.php?action=h5p_insert_content'),
            array(
                (object) array(
                    'text' => __('Title', $this->plugin_slug),
                    'sortable' => TRUE
                ),
                (object) array(
                    'text' => __('Content type', $this->plugin_slug),
                    'sortable' => TRUE,
                    'facet' => TRUE
                ),
                (object) array(
                    'text' => __('Author', $this->plugin_slug),
                    'sortable' => TRUE,
                    'facet' => TRUE
                ),
                (object) array(
                    'text' => __('Tags', $this->plugin_slug),
                    'sortable' => FALSE,
                    'facet' => TRUE
                ),
                (object) array(
                    'text' => __('Last modified', $this->plugin_slug),
                    'sortable' => TRUE
                ),
                (object) array(
                    'class' => 'h5p-insert-link'
                )
            ),
            array(true),
            __("No H5P content available. You must upload or create new content.", $this->plugin_slug),
            (object) array(
                'by' => 4,
                'dir' => 0
            )
        );
    }

    /**
     * Log when content is inserted
     *
     * @since 1.6.0
     */
    public function ajax_inserted() {
        global $wpdb;

        $content_id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
        if (!$content_id) {
            return;
        }

        // Get content info for log
        $content = $wpdb->get_row($wpdb->prepare("
        SELECT c.title, l.name, l.major_version, l.minor_version
          FROM {$wpdb->prefix}h5p_contents c
          JOIN {$wpdb->prefix}h5p_libraries l ON l.id = c.library_id
         WHERE c.id = %d
        ", $content_id));

        // Log view
        new H5P_Event('content', 'shortcode insert',
            $content_id, $content->title,
            $content->name, $content->major_version . '.' . $content->minor_version);
    }

    /**
     * List content to choose from when inserting H5Ps.
     *
     * @since 1.2.0
     */
    public function ajax_insert_content() {
        $this->ajax_contents(TRUE);
    }

    /**
     * Generic function for listing all H5P contents.
     *
     * @global \wpdb $wpdb
     * @since 1.2.0
     * @param boolean $insert Place insert buttons instead of edit links.
     */
    public function ajax_contents($insert = FALSE) {
        global $wpdb;

        // Load input vars.
        $admin = H5P_Plugin_Admin::get_instance();
        list($offset, $limit, $sort_by, $sort_dir, $filters, $facets) = $admin->get_data_view_input();

        // Different fields for insert
        if ($insert) {
            $fields = array('title', 'content_type', 'user_name', 'tags', 'updated_at', 'id', 'user_id', 'content_type_id', 'slug');
        }
        else {
            $fields = array('title', 'content_type', 'user_name', 'tags', 'updated_at', 'id', 'user_id', 'content_type_id');
        }

        // Add filters to data query
        $conditions = array();
        if (isset($filters[0])) {
            $conditions[] = array('title', $filters[0], 'LIKE');
        }

        // Limit query to content types that user is allowed to view
        if (current_user_can('view_others_h5p_contents') == FALSE) {
            array_push($conditions, array('user_id', get_current_user_id(), '='));
        }

        if ($facets !== NULL) {
            $facetmap = array(
                'content_type' => 'content_type_id',
                'user_name' => 'user_id',
                'tags' => 'tags'
            );
            foreach ($facets as $field => $value) {
                if (isset($facetmap[$fields[$field]])) {
                    $conditions[] = array($facetmap[$fields[$field]], $value, '=');
                }
            }
        }

        // Create new content query
        $content_query = new H5PContentQuery($fields, $offset, $limit, $fields[$sort_by], $sort_dir, $conditions);
        $results = $content_query->get_rows();

        // Make data more readable for humans
        $rows = array();
        foreach ($results as $result)  {
            $rows[] = ($insert ? $this->get_contents_insert_row($result) : $this->get_contents_row($result));
        }

        // Print results
        header('Cache-Control: no-cache');
        header('Content-type: application/json');
        print json_encode(array(
            'num' => $content_query->get_total(),
            'rows' => $rows
        ));
        exit;
    }

    /**
     * Format time for use in content lists.
     *
     * @since 1.6.0
     * @param int $timestamp
     * @return string
     */
    private function format_time($timestamp) {
        // Get timezone offset
        $offset = get_option('gmt_offset') * 3600;

        // Format time
        $time = strtotime($timestamp);
        $current_time = current_time('timestamp');
        $timediff = human_time_diff($time + $offset, $current_time);
        $human_time = sprintf(__('%s ago', $this->plugin_slug), $timediff);

        if ($current_time > $time + DAY_IN_SECONDS) {
            // Over a day old, swap human time for formatted time
            $formatted_time = $human_time;
            $human_time = date('Y/m/d', $time + $offset);
        }
        else {
            $formatted_time = date(get_option('time_format'), $time + $offset);
        }

        $iso_time = date('c', $time);
        return "<time datetime=\"{$iso_time}\" title=\"{$formatted_time}\">{$human_time}</time>";
    }

    /**
     * Format tags for use in content lists.
     *
     * @since 1.6.0
     * @param string $tags
     * @return array With tag objects
     */
    private function format_tags($tags) {
        // Tags come in CSV format, create Array instead
        $result = array();
        $csvtags = explode(';', $tags);
        foreach ($csvtags as $csvtag) {
            if ($csvtag !== '') {
                $tag = explode(',', $csvtag);
                $result[] = array(
                    'id' => $tag[0],
                    'title' => esc_html($tag[1])
                );
            }
        }
        return $result;
    }

    /**
     * Get row for insert table with all values escaped and ready for view.
     *
     * @since 1.2.0
     * @param stdClass $result Database result for row
     * @return array
     */
    private function get_contents_insert_row($result) {
        return array(
            esc_html($result->title),
            array(
                'id' => $result->content_type_id,
                'title' => esc_html($result->content_type)
            ),
            array(
                'id' => $result->user_id,
                'title' => esc_html($result->user_name)
            ),
            $this->format_tags($result->tags),
            $this->format_time($result->updated_at),
            '<button class="button h5p-insert" data-id="' . $result->id . '" data-slug="' . $result->slug . '">' . __('Insert', $this->plugin_slug) . '</button>'
        );
    }

    /**
     * Get row for contents table with all values escaped and ready for view.
     *
     * @since 1.2.0
     * @param stdClass $result Database result for row
     * @return array
     */
    private function get_contents_row($result) {
        $row = array(
            '<a href="' . admin_url('admin.php?page=h5p&task=show&id=' . $result->id) . '">' . esc_html($result->title) . '</a>',
            array(
                'id' => $result->content_type_id,
                'title' => esc_html($result->content_type)
            ),
            array(
                'id' => $result->user_id,
                'title' => esc_html($result->user_name)
            ),
            $this->format_tags($result->tags),
            $this->format_time($result->updated_at),
            $result->id
        );

        $content = array('user_id' => $result->user_id);

        // Add user results link
        if (get_option('h5p_track_user', TRUE)) {
            if ($this->current_user_can_view_content_results($content)) {
                $row[] = '<a href="' . admin_url('admin.php?page=h5p&task=results&id=' . $result->id) . '">' . __('Results', $this->plugin_slug) . '</a>';
            }
            else {
                $row[] = '';
            }
        }

        // Add edit link
        if ($this->current_user_can_edit($content)) {
            $row[] = '<a href="' . admin_url('admin.php?page=h5p_new&id=' . $result->id) . '">' . __('Edit', $this->plugin_slug) . '</a>';
        }
        else {
            $row[] = '';
        }

        return $row;
    }

    /**
     * Returns the instance of the h5p editor library.
     *
     * @since 1.1.0
     * @return \H5peditor
     */
        private function get_h5peditor_instance() {
        if (self::$h5peditor === null) {
            $upload_dir = '/h5p/uploads/exports';
            $plugin = H5P_Plugin::get_instance();
//            dd($plugin);
            self::$h5peditor = new H5peditor(
                $plugin->get_h5p_instance('core'),
                new H5PEditorWordPressStorage(),
                new H5PEditorWordPressAjax()
            );
        }

        return self::$h5peditor;
    }

    /**
     * Add assets and JavaScript settings for the editor.
     *
     * @since 1.1.0
     * @param int $id optional content identifier
     */
    public function add_editor_assets($id = NULL) {
        $plugin = H5P_Plugin::get_instance();
//        var_dump($plugin);
//        dd($plugin);
        $plugin->add_core_assets();
//        dd($plugin);

        // Make sure the h5p classes are loaded
        $plugin->get_h5p_instance('core');
        $this->get_h5peditor_instance();

        // Add JavaScript settings
        $settings = $plugin->get_settings();
        $cache_buster = '?ver=' . H5P_Plugin::VERSION;

        // Use jQuery and styles from core.
        $assets = array(
            'css' => $settings['core']['styles'],
            'js' => $settings['core']['scripts']
        );

        // Use relative URL to support both http and https.
        $upload_dir = 'h5p/h5p-editor-php-library';
        $url = '/' . preg_replace('/^[^:]+:\/\/[^\/]+\//', '', $upload_dir) . '/';

        // Add editor styles
        foreach (H5peditor::$styles as $style) {
            $assets['css'][] = $url . $style . $cache_buster;
        }

        // Add editor JavaScript
        foreach (H5peditor::$scripts as $script) {
            // We do not want the creator of the iframe inside the iframe
            if ($script !== 'scripts/h5peditor-editor.js') {
                $assets['js'][] = $url . $script . $cache_buster;
            }
        }
        $scripts = [];
        // Add JavaScript with library framework integration (editor part)
        $scripts2 [0] = H5P_Plugin_Admin::add_script('editor-editor', 'h5p-editor-php-library/scripts/h5peditor-editor.js');
        $scripts2 [1] = H5P_Plugin_Admin::add_script('editor', 'admin/scripts/h5p-editor.js');

        // Add translation
        $language = $plugin->get_language();
        $language_script = 'h5p-editor-php-library/language/' . $language . '.js';
        if (!file_exists(__FILE__ . '../' . $language_script)) {
            $language_script = 'h5p-editor-php-library/language/en.js';
        }
        $scripts2 [2] = H5P_Plugin_Admin::add_script('language', $language_script);

        // Add JavaScript settings
        $content_validator = $plugin->get_h5p_instance('contentvalidator');
        $settings['editor'] = array(
            'filesPath' => $plugin->get_h5p_url() . '/editor',
            'fileIcon' => array(
                'path' => 'h5p/h5p-editor-php-library/images/binary-file.png',
                'width' => 50,
                'height' => 50,
            ),
            'ajaxPath' => 'ajax?_token=' . csrf_token() . '&action=h5p_',
            'libraryUrl' => url('/').'/h5p/h5p-editor-php-library/',
            'copyrightSemantics' => $content_validator->getCopyrightSemantics(),
            'metadataSemantics' => $content_validator->getMetadataSemantics(),
            'assets' => $assets,
            'deleteMessage' => 'Are you sure you wish to delete this content?', $this->plugin_slug,
            'apiVersion' => H5PCore::$coreApi,
            'language' => $language
        );

        if ($id !== NULL) {
            $settings['editor']['nodeVersionId'] = $id;
        }
        print '<script src="'. $scripts2[0] .'" type="text/javascript" defer=""></script>';
        print '<script src="'. $scripts2[1] .'" type="text/javascript" defer=""></script>';
        print '<script src="'. $scripts2[2] .'" type="text/javascript" defer=""></script>';
        $plugin->print_settings($settings);
    }

    /**
     * Handle ajax request to install library from url
     */
    public function ajax_library_upload() {
        $token = filter_input(INPUT_GET, 'token');
        $filePath = $_FILES['h5p']['tmp_name'];
        $editor = $this->get_h5peditor_instance();
        $contentId = filter_input(INPUT_POST, 'contentId', FILTER_SANITIZE_NUMBER_INT);
        $editor->ajax->action(H5PEditorEndpoints::LIBRARY_UPLOAD, $token, $filePath, $contentId);
        exit;
    }

    /**
     * Handle ajax request to install library from url
     */
    public function ajax_library_install() {
        $token = filter_input(INPUT_GET, 'token');
        $name = filter_input(INPUT_GET, 'id');

        $editor = $this->get_h5peditor_instance();
        $editor->ajax->action(H5PEditorEndpoints::LIBRARY_INSTALL, $token, $name);
        exit;
    }

    /**
     * Get library details through AJAX.
     *
     * @since 1.0.0
     */
    public function ajax_libraries() {
    $editor = $this->get_h5peditor_instance();

    // Get input
    $name = filter_input(INPUT_GET, 'machineName', FILTER_SANITIZE_STRING);
    $major_version = filter_input(INPUT_GET, 'majorVersion', FILTER_SANITIZE_NUMBER_INT);
    $minor_version = filter_input(INPUT_GET, 'minorVersion', FILTER_SANITIZE_NUMBER_INT);
//    dd($name);
//    var_dump($name, $major_version, $minor_version);
    // Retrieve single library if name is specified
    if ($name) {
        $plugin = H5P_Plugin::get_instance();
        $plugin->get_h5p_instance('core');
//        dd($editor->ajax);
        $editor->ajax->action(H5PEditorEndpoints::SINGLE_LIBRARY, $name,
            $major_version, $minor_version, $plugin->get_language(), '',
            $plugin->get_h5p_path(), filter_input(INPUT_GET, 'default-language')
        );

        // Log library load
        new H5P_Event('library', NULL,
            NULL, NULL,
            $name, $major_version . '.' . $minor_version);
    }
    else {
        // Otherwise retrieve all libraries
        $editor->ajax->action(H5PEditorEndpoints::LIBRARIES);
    }
    exit;
}

    /**
     * Get content type cache
     */
    public function ajax_content_type_cache() {
        $token = filter_input(INPUT_GET, 'token', FILTER_SANITIZE_STRING);

        $editor = $this->get_h5peditor_instance();
        $editor->ajax->action(H5PEditorEndpoints::CONTENT_TYPE_CACHE, $token);
        exit;
    }

    /**
     * Get translations
     */
    public function ajax_translations() {
        $language = filter_input(INPUT_GET, 'language', FILTER_SANITIZE_STRING);

        $editor = $this->get_h5peditor_instance();
        $editor->ajax->action(H5PEditorEndpoints::TRANSLATIONS, $language);
        exit;
    }

    /**
     * Handle file uploads through AJAX.
     *
     * @since 1.1.0
     */
    public function ajax_files() {
        $token = filter_input(INPUT_GET, 'token', FILTER_SANITIZE_STRING);
        $contentId = filter_input(INPUT_POST, 'contentId', FILTER_SANITIZE_NUMBER_INT);

        $editor = $this->get_h5peditor_instance();
        $editor->ajax->action(H5PEditorEndpoints::FILES, $token, $contentId);
        exit;
    }

    /**
     * Provide data for content results view.
     *
     * @since 1.2.0
     */
    public function ajax_content_results() {
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
        if (!$id) {
            return; // Missing id
        }

        $plugin = H5P_Plugin::get_instance();
        $content = $plugin->get_content($id);
        if (is_string($content) || !$this->current_user_can_edit($content)) {
            return; // Error loading content or no access
        }

        $plugin_admin = H5P_Plugin_Admin::get_instance();
        $plugin_admin->print_results($id);
    }

    /**
     * Handle filtering of parameters through AJAX.
     *
     * @since 1.14.0
     */
    public function ajax_filter() {
        $token = filter_input(INPUT_GET, 'token', FILTER_SANITIZE_STRING);
        $libraryParameters = filter_input(INPUT_POST, 'libraryParameters');

        $editor = $this->get_h5peditor_instance();
        $editor->ajax->action(H5PEditorEndpoints::FILTER, $token, $libraryParameters);
        exit;
    }

    /**
     * @inheritDoc
     */
    public function render()
    {
        // TODO: Implement render() method.
    }
}

