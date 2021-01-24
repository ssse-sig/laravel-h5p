<?php

namespace App\Http\Controllers;
use App\View\Components\H5P_Plugin_Admin;
use App\View\Components\H5PContentAdmin;
use App\View\Components\H5PCore;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
//include ('app/libraries/h5p/admin/class-h5p-plugin-admin.php');
//include (app_path().'/libraries/h5p/admin/class-h5p-plugin-admin.php');
//include (/*app_path().*/'app/libraries/h5p/public/class-h5p-plugin.php');
use App\View\Components\H5P_Plugin;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function test($id){

       $plugin = H5P_Plugin::get_instance();
       return $content = $plugin->get_content($id);

    }
    public function test2($id){

        //ddd('test');

        // it works:
        $plugin_admin = H5P_Plugin_Admin::get_instance();
        $plugin = H5P_Plugin::get_instance();


        // this is  experimental --> I'm not sure it was the right way to do it. -------------------------------------------------------
//        $plugin_slug = 'h5p';
//        $H5PContentAdmin = new H5PContentAdmin($plugin_slug);
//        $H5PContentAdmin->load_content($id);
//        $content = $H5PContentAdmin->content;
//
//        $embed_code = $plugin->add_assets($content);
//        include_once('h5p/admin//show-content.php');
//        include_once('h5p/admin/views/show-content.php');
        // it works:--------------------------------------------------------------------
        $plugin_admin->embed();
    }

    public function writeResultsInDB(){
        $adminplugin = H5P_Plugin_Admin::get_instance();
        $adminplugin->ajax_results();
    }

    public function  showHub(){

        // admin plugin,  riga 410
//        $plugin_slug = 'h5p';
//        function add_submenu_page( $parent_slug,
//                                   $page_title,
//                                   $menu_title,
//                                   $capability,
//                                   $menu_slug,
//                                   $function = ''){};//
//        $contents_page = add_submenu_page(
//            $plugin_slug,
//            'Add new',
//            'Add new',
//            'edit_h5p_contents',
//            $plugin_slug . '_new'
//            );

        $plugin_admin = H5P_Plugin_Admin::get_instance();
        $plugin_admin->display_new_content_page();

    }
    public function  deleteContent(){

        $plugin_slug = 'h5p';
        $contentAdmin = new H5PContentAdmin($plugin_slug);
//        $action = 'delete';
        $contentAdmin->process_new_content(true);
//        return redirect('https://h5pdawp2.test/3');
        return redirect( \URL::to('/').'/contents');



    }

    public function  ajax_content_editor(){

        $action= filter_input(INPUT_GET,"action");
//        dd($action);
        if($action == "h5p_content-type-cache"){
            $plugin_slug = 'h5p';
            $contentAdmin = new H5PContentAdmin($plugin_slug);
            $contentAdmin->ajax_content_type_cache();
        }
        if($action =='h5p_libraries'){
            $this->ajax_libraries_call();
        }
        if($action == 'h5p_files'){
            $plugin_slug = 'h5p';
            $contentAdmin = new H5PContentAdmin($plugin_slug);
            $contentAdmin->ajax_files();
        }

    }
    public function  ajax_libraries_call(){
        $plugin_slug = 'h5p';
        $contentAdmin = new H5PContentAdmin($plugin_slug);
        $contentAdmin->ajax_libraries();
    }
    public function contents(){
//        dump('fff');
        $contents = \DB::table('wp_h5p_contents')->select('*')->get();
//        dd($contents);
        return view('ContentList', ['contents' => $contents]);
    }

    public function newContent(){
//        $this->showHub();
//        $plugin_slug = 'h5p';
//        $contentAdmin = new H5PContentAdmin($plugin_slug);
//        $contentAdmin->process_new_content(true);
        $plugin_slug = 'h5p';
        $contentAdmin = new H5PContentAdmin($plugin_slug);
        $id = $contentAdmin->process_new_content(true);
//        dd('test');
//        dd($id);
        return redirect(\URL::to('/').'/2/9?id='.$id);
//        dd('test 3');

    }
    public function editContent(){
//        dd('test');
        $plugin_slug = 'h5p';
        $contentAdmin = new H5PContentAdmin($plugin_slug);
        $contentAdmin->display_new_content_page("");

    }    public function editContentPost(){
//        dd('test');
        $plugin_slug = 'h5p';
        $contentAdmin = new H5PContentAdmin($plugin_slug);
        $contentAdmin->display_new_content_page("");

    }
}
