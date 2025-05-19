<?php

use Illuminate\Support\Facades\Route;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-cloudinary', function () {
    try {
        $url = Cloudinary::getImage('sample')->toUrl();
        dd('khbj');
        return response()->json([
            'message' => 'Cloudinary test successful',
            'url' => $url
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Cloudinary test failed',
            'error' => $e->getMessage()
        ], 500);
    }
});