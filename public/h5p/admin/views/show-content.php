<?php
/**
 * Show specific H5P Content.
 *
 * @package   H5P
 * @author    Joubel <contact@joubel.com>
 * @license   MIT
 * @link      http://joubel.com
 * @copyright 2014 Joubel
 */
?>

<div class="wrap">
  <h2>
    <?php //print esc_html($this->content['title']); ?>
    <?php /*$this->content['title']*/; ?>
<!--    --><?php //if (/*$this->current_user_can_view_content_results($this->content $id)*/true): ?>
<!--      <a href="--><?php //echo 'http://h5pdawp2.test/2/'.$id.'?id=' . /*$this->content['id']*/$id; ?><!--" class="add-new-h2">--><?php //echo 'Results'; ?><!--</a>-->
<!--    --><?php //endif; ?>
<!--    --><?php //if ($this->current_user_can_edit($this->content)): ?>
<!--<a href="--><?php //echo 'http://h5pdawp2.test/2/'.$id.'?id=' . $id ?><!--" class="add-new-h2" >--><?php //echo 'Edit'?><!-- </a>-->
<!--    --><?php //endif; ?>
  </h2>
  <?php print \App\View\Components\H5P_Plugin_Admin::print_messages(); ?>
  <div class="h5p-wp-admin-wrapper">
    <div class="h5p-content-wrap">
      <?php var_dump($embed_code); print $embed_code; ?>
    </div>
<!--    --><?php //if (current_user_can('edit_h5p_contents')): ?>
<!--      <div class="postbox h5p-sidebar">-->
<!--        <h2>--><?php //esc_html_e('Shortcode', $this->plugin_slug); ?><!--</h2>-->
<!--        <div class="h5p-action-bar-settings h5p-panel">-->
<!--          <p>--><?php //esc_html_e("What's next?", $this->plugin_slug); ?><!--</p>-->
<!--          <p>--><?php //esc_html_e('You can use the following shortcode to insert this interactive content into posts, pages, widgets, templates etc.', $this->plugin_slug); ?><!--</p>-->
<!--          <code>[h5p id="--><?php //print $this->content['id'] ?><!--"]</code>-->
<!--        </div>-->
<!--      </div>-->
<!--    --><?php //endif; ?>
<!--    <div class="postbox h5p-sidebar">-->
<!--      <h2>--><?php ////esc_html_e('Tags', $this->plugin_slug); ?><!--</h2>-->
<!--      <h2>--><?php //echo 'Tags'?><!--</h2>-->
<!--      <div class="h5p-action-bar-settings h5p-panel">-->
<!--        --><?php //if (empty($this->content['tags'])): ?>
<!--          <p style="font-style: italic;">--><?php //echo 'No tags' ?><!--</p>-->
<!--        --><?php //else: ?>
<!--          <p>--><?php //echo $this->content['tags']; ?><!--</p>-->
<!--        --><?php //endif; ?>
<!--      </div>-->
<!--    </div>-->
  </div>
</div>
