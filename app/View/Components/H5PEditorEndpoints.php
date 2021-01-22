<?php

namespace App\View\Components;

use Illuminate\View\Component;

abstract class H5PEditorEndpoints {

    /**
     * Endpoint for retrieving library data necessary for displaying
     * content types in the editor.
     */
    const LIBRARIES = 'libraries';

    /**
     * Endpoint for retrieving a singe library's data necessary for displaying
     * main libraries
     */
    const SINGLE_LIBRARY = 'single-library';

    /**
     * Endpoint for retrieving the currently stored content type cache
     */
    const CONTENT_TYPE_CACHE = 'content-type-cache';

    /**
     * Endpoint for installing libraries from the Content Type Hub
     */
    const LIBRARY_INSTALL = 'library-install';

    /**
     * Endpoint for uploading libraries used by the editor through the Content
     * Type Hub.
     */
    const LIBRARY_UPLOAD = 'library-upload';

    /**
     * Endpoint for uploading files used by the editor.
     */
    const FILES = 'files';

    /**
     * Endpoint for retrieveing translation files
     */
    const TRANSLATIONS = 'translations';

    /**
     * Endpoint for filtering parameters.
     */
    const FILTER = 'filter';
}
