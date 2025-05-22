<?php

namespace App\Http\Controllers\Api\V1\Media;

use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class MediaController extends Controller
{
    protected $cloudinary;
    public function __construct()
    {
        $this->cloudinary = new Cloudinary(config('cloudinary'));
    }

    //get image by url 
    public function getImageUrl($publicId)
    {
        try {
            $url = $this->cloudinary->image($publicId)->toUrl();
            return response()->json([
                'message' => 'Lấy ảnh thành công',
                'url' => $url
            ]);
        } catch (\Exception $e) {
            Log::error('Lỗi lấy ảnh: ' . $e->getMessage());
            return response()->json([
                'message' => 'Lỗi lấy ảnh',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //upload image 
    public function uploadImage(Request $request)
    {
        $request->validate(
            [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:51200',
            ],
            [
                'image.required' => 'Vui lòng chọn ảnh',
                'image.image' => 'Tệp tải lên không phải là ảnh',
                'image.mimes' => 'Chỉ hỗ trợ các định dạng jpeg, png, jpg, gif',
                'image.max' => 'Kích thước tệp tối đa là 2MB',
            ]
        );
        try {

            $uploaded = $this->cloudinary->uploadApi()
                ->upload($request->file('image')->getRealPath(), [
                    'folder' => 'images',
                    'public_id' => uniqid(),
                    'overwrite' => true,
                ]);
            return response()->json([
                'message' => 'Tải ảnh lên thành công',
                'url' => $uploaded['secure_url'],
            ]);
        } catch (\Exception $e) {
            Log::error('Upload image failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Upload image failed',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    //upload video
    public function uploadVideo(Request $request)
    {
        $request->validate(
            [
                'video' => 'required|mimes:mp4,mov,avi,wmv|max:102400',
            ],
            [
                'video.required' => 'Vui lòng chọn video',
                'video.mimes' => 'Chỉ hỗ trợ các định dạng mp4, mov, avi, wmv',
                'video.max' => 'Kích thước tệp tối đa là 100MB',
            ]
        );

        try {
            $uploaded = $this->cloudinary->uploadApi()
                ->upload($request->file('video')->getRealPath(), [
                    'folder' => 'videos',
                    'public_id' => uniqid(),
                    'resource_type' => 'video',
                    'overwrite' => true,
                ]);
            return response()->json([
                'message' => 'Tải video lên thành công',
                'url' => $uploaded['secure_url'],
            ]);
        } catch (\Exception $e) {
            Log::error('Upload video failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Upload video failed',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
