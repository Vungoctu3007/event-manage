<?php

use App\Http\Controllers\Api\V1\Event\EventController;
use App\Http\Controllers\Api\V1\Media\MediaController;
use App\Http\Controllers\Api\V1\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', [UserController::class, 'index']);


// API Cloudinary
Route::prefix('media')->group(function () {
    Route::get('/image/{publicId}', [MediaController::class, 'getImageUrl']);
    Route::post('/upload-image', [MediaController::class, 'uploadImage']);
    Route::post('/upload-video', [MediaController::class, 'uploadVideo']);
});

// Event Organizer
Route::prefix('event')->group(function () {
    Route::post('/create', [EventController::class, 'createEvent']);
    Route::get('/{event_id}/schedules', [EventController::class, 'getSchedulesWithTickets']);
    Route::get('/pagination', [EventController::class, 'getListEventsPagination']);
});
