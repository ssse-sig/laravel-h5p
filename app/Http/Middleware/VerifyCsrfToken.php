<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */

    // avevo disabilitato la verifica CSRF!!! malissimo ma non sapevo come farlo correttamente
    // ora ho risolto, nella richiesta ajax dovevo scrivere _token invece di token, per passare il token in GET.
    protected $except = [
//          '*'
    ];
}
