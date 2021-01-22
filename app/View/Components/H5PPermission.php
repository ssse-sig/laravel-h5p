<?php

namespace App\View\Components;

use Illuminate\View\Component;

abstract class H5PPermission {
    const DOWNLOAD_H5P = 0;
    const EMBED_H5P = 1;
    const CREATE_RESTRICTED = 2;
    const UPDATE_LIBRARIES = 3;
    const INSTALL_RECOMMENDED = 4;
    const COPY_H5P = 8;
}
