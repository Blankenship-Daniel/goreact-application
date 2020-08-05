<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Media;

class MediaController extends Controller
{
    public function uploadMedia(Request $request, $userId)
    {
        $media = new Media;
        $media->user_id = $userId;
        $media->url = $request->url;
        $media->save();
        return $media->toJson(JSON_PRETTY_PRINT);
    }

    public function getAllMediaForUser($userId) 
    {
        $media = Media::select('url')->where('user_id', $userId)->get();
        return $media->toJson(JSON_PRETTY_PRINT);
    }
}
