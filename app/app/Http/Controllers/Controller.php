<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

class Controller extends BaseController
{
    public function getRes($resource) {
        if(file_exists('../storage/app/'.$resource.'.jpg'))
            return Storage::get($resource.'.jpg');
        print_r(Storage::get('no.png'));
        return;

    }
}
