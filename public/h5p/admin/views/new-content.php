<?php
/**
 * Add new H5P Content.
 *
 * @package   H5P
 * @author    Joubel <contact@joubel.com>
 * @license   MIT
 * @link      http://joubel.com
 * @copyright 2014 Joubel
 */
?>

    <title> Add New H5P Content </title>
    <?php echo '<script src="'. $scripts[0] .'" type="text/javascript" defer=""></script>' ?>
    <?php echo '<script src="'. $scripts[1] .'" type="text/javascript" defer=""></script>' ?>
    <?php echo '<script src="'. $scripts[2] .'" type="text/javascript" defer=""></script>' ?>

    <?php echo '<link rel="stylesheet" id="dashicons-css" href="'.url('/').'\/h5p\/h5p-php-library\/styles\/h5p-core-button.css?ver=1.15.0" media="all">' ?>
    <?php echo '<link rel="stylesheet" id="dashicons-css" href="'.url('/').'\/h5p\/h5p-php-library\/styles\/h5p-confirmation-dialog.css?ver=1.15.0" media="all">' ?>
    <?php echo '<link rel="stylesheet" id="dashicons-css" href="'.url('/').'\/h5p\/h5p-editor-php-library\/libs\/darkroom.css?ver=1.15.0" media="all">' ?>
    <?php echo '<link rel="stylesheet" id="dashicons-css" href="'.url('/').'\/h5p\/h5p-php-library\/styles\/h5p.css?ver=1.15.0" media="all">' ?>
    <?php echo '<link rel="stylesheet" id="dashicons-css" href="'.url('/').'\/h5p\/h5p-editor-php-library\/styles\/css\/h5p-hub-client.css?ver=1.15.0" media="all">' ?>
    <?php echo '<link rel="stylesheet" id="dashicons-css" href="'.url('/').'\/h5p\/h5p-editor-php-library\/styles\/css\/fonts.css?ver=1.15.0" media="all">' ?>
    <?php echo '<link rel="stylesheet" id="dashicons-css" href="'.url('/').'\/h5p\/h5p-editor-php-library\/styles\/css\/application.css?ver=1.15.0" media="all">' ?>
    <?php echo '<link rel="stylesheet" id="dashicons-css" href="'.url('/').'\/h5p\/h5p-editor-php-library\/styles\/css\/libs\/zebra_datepicker.min.css?ver=1.15.0" media="all">' ?>

    <!-- script aggiunti cercando di vedere se erano essenziali-->
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/jquery.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/h5p.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/h5p-event-dispatcher.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/h5p-x-api-event.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/h5p-x-api.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/h5p-content-type.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/h5p-confirmation-dialog.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/h5p-action-bar.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/request-queue.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-editor-php-library/scripts/h5peditor-editor.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/admin/scripts/h5p-editor.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-editor-php-library/language/en.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/jquery.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/h5p-php-library/js/h5p-display-options.js?ver=1.15.0'></script>" ?>
<?php echo "<script src='".url('/')."/h5p/admin/scripts/h5p-toggle.js?ver=1.15.0'></script>" ?>
    <!-- -------------------------------------------------------- -->


<div class="wrap">



  <h2>
    <?php if ($this->content === NULL || is_string($this->content)): ?>
<!--      --><?php //print esc_html(get_admin_page_title()); ?>
      <?php print "Select content type" ?>
    <?php else: ?>
<!--      --><?php //esc_html_e('Edit', $this->plugin_slug); ?><!-- <em>--><?php //print esc_html($this->content['title']); ?><!--</em>-->
      <?php echo 'Edit'; ?> <em><?php print $this->content['title']; ?></em>
      <a href="<?php print "https://h5pdawp2.test/2/9?id=".$this->content['id']; ?>" class="add-new-h2"><?php echo'View'; ?></a>
<!--      --><?php //if ($this->current_user_can_view_content_results($this->content)): ?>
<!--        <a href="--><?php //print admin_url('admin.php?page=h5p&task=results&id=' . $this->content['id']); ?><!--" class="add-new-h2">--><?php //_e('Results', $this->plugin_slug); ?><!--</a>-->
<!--      --><?php //endif;?>
    <?php endif; ?>
  </h2>
  <?php \App\View\Components\H5P_Plugin_Admin::print_messages(); ?>
  <?php if (!$contentExists || $this->current_user_can_edit($this->content)): ?>
    <form method="post" enctype="multipart/form-data" id="h5p-content-form">
      <div id="post-body-content">
        <div class="h5p-upload">
          <input type="file" name="h5p_file" id="h5p-file"/>
<!--          --><?php //if (current_user_can('disable_h5p_security')): ?>
          <?php if (true): ?>
            <div class="h5p-disable-file-check">
<!--              <label><input type="checkbox" name="h5p_disable_file_check" id="h5p-disable-file-check"/> --><?php //_e('Disable file extension check', $this->plugin_slug); ?><!--</label>-->
                <label><input type="checkbox" name="h5p_disable_file_check" id="h5p-disable-file-check"/> <?php echo 'Disable file extension check'; ?></label>
<!--              <div class="h5p-warning">--><?php //_e("Warning! This may have security implications as it allows for uploading php files. That in turn could make it possible for attackers to execute malicious code on your site. Please make sure you know exactly what you're uploading.", $this->plugin_slug); ?><!--</div>-->
              <div class="h5p-warning"><?php echo "Warning! This may have security implications as it allows for uploading php files. That in turn could make it possible for attackers to execute malicious code on your site. Please make sure you know exactly what you're uploading."; ?></div>
            </div>
          <?php endif; ?>
        </div>
        <div class="h5p-create"><div class="h5p-editor"><?php echo 'Waiting for javascript...'; ?></div></div>
<!--        --><?php // if ($examplesHint): ?>
<!--          <div class="no-content-types-hint">-->
<!--            <p>--><?php //printf(wp_kses(__('It looks like there are no content types installed. You can get the ones you want by using the small \'Download\' button in the lower left corner on any example from the <a href="%s" target="_blank">Examples and Downloads</a> page and then you upload the file here.', $this->plugin_slug), array('a' => array('href' => array(), 'target' => array()))), esc_url('https://h5p.org/content-types-and-applications')); ?><!--</p>-->
<!--            <p>--><?php //printf(wp_kses(__('If you need any help you can always file a <a href="%s" target="_blank">Support Request</a>, check out our <a href="%s" target="_blank">Forum</a> or join the conversation in the <a href="%s" target="_blank">H5P Community Chat</a>.', $this->plugin_slug), array('a' => array('href' => array(), 'target' => array()))), esc_url('https://wordpress.org/support/plugin/h5p'), esc_url('https://h5p.org/forum'), esc_url('https://gitter.im/h5p/CommunityChat')); ?><!--</p>-->
<!--          </div>-->
<!--        --><?php //endif ?>
      </div>
      <div class="postbox h5p-sidebar">
        <h2><?php echo 'Actions'; ?></h2>
        <div id="minor-publishing" <?php if (TRUE) : print 'style="display:none"'; endif; ?>>
          <label><input type="radio" name="action" value="upload"<?php if ($upload): print ' checked="checked"'; endif; ?>/><?php echo 'Upload'; ?></label>
          <label><input type="radio" name="action" value="create"/><?php echo 'Create'; ?></label>
          <input type="hidden" name="library" value="<?php print $library; ?>"/>
          <input type="hidden" name="parameters" value="<?php print $parameters; ?>"/>
<!--            <input type="hidden" name="parameters" value="{&quot;params&quot;:{&quot;media&quot;:{&quot;disableImageZooming&quot;:false},&quot;correct&quot;:&quot;true&quot;,&quot;behaviour&quot;:{&quot;enableRetry&quot;:true,&quot;enableSolutionsButton&quot;:true,&quot;enableCheckButton&quot;:true,&quot;confirmCheckDialog&quot;:false,&quot;confirmRetryDialog&quot;:false,&quot;autoCheck&quot;:false},&quot;l10n&quot;:{&quot;trueText&quot;:&quot;True&quot;,&quot;falseText&quot;:&quot;False&quot;,&quot;score&quot;:&quot;You got @score of @total points&quot;,&quot;checkAnswer&quot;:&quot;Check&quot;,&quot;showSolutionButton&quot;:&quot;Show solution&quot;,&quot;tryAgain&quot;:&quot;Retry&quot;,&quot;wrongAnswerMessage&quot;:&quot;Wrong answer&quot;,&quot;correctAnswerMessage&quot;:&quot;Correct answer&quot;,&quot;scoreBarLabel&quot;:&quot;You got :num out of :total points&quot;},&quot;confirmCheck&quot;:{&quot;header&quot;:&quot;Finish ?&quot;,&quot;body&quot;:&quot;Are you sure you wish to finish ?&quot;,&quot;cancelLabel&quot;:&quot;Cancel&quot;,&quot;confirmLabel&quot;:&quot;Finish&quot;},&quot;confirmRetry&quot;:{&quot;header&quot;:&quot;Retry ?&quot;,&quot;body&quot;:&quot;Are you sure you wish to retry ?&quot;,&quot;cancelLabel&quot;:&quot;Cancel&quot;,&quot;confirmLabel&quot;:&quot;Confirm&quot;},&quot;question&quot;:&quot;<p>unico<\/p>\n&quot;},&quot;metadata&quot;:{&quot;title&quot;:&quot;test 123&quot;,&quot;license&quot;:&quot;U&quot;}}">-->
           <?php print csrf_field(); ?>
        </div>
        <div id="major-publishing-actions" class="submitbox">
          <?php if ($this->content !== NULL && !is_string($this->content)): ?>
<!--            <a class="submitdelete deletion" href="--><?php //print wp_nonce_url(admin_url('admin.php?page=h5p_new&id=' . $this->content['id']), 'deleting_h5p_content', 'delete'); ?><!--">--><?php //echo'Delete';?><!--</a>-->
          <?php endif; ?>
          <input type="submit" name="submit-button" value="<?php if($this->content === NULL) {echo 'Create'; }else {echo 'Update';}?>" class="button button-primary button-large"/>
        </div>
      </div>


      <div class="postbox h5p-sidebar">
        <div role="button" class="h5p-toggle" tabindex="0" aria-expanded="true" aria-label="<?php echo 'Toggle panel'; ?>"></div>
        <h2><?php echo 'Tags'; ?></h2>
        <div class="h5p-panel">
          <textarea rows="2" name="tags" class="h5p-tags"><?php if ($contentExists): print $this->content['tags']; endif; ?></textarea>
          <p class="howto"><?php echo 'Separate tags with commas'; ?></p>
        </div>
      </div>
    </form>
  <?php endif; ?>
</div>
