<?php
namespace App\Http\Controllers\Api\V1\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\UserService;
use App\Repositories\Interfaces\UserRepositoryInterface as UserRepository;
// use App\Repositories\UserRepository;
use App\Models\User;

class UserController extends Controller
{

    protected $userService;
    protected $userRepository;

    public function __construct(
        UserService $userService,
        UserRepository $userRepository,
    ){
        $this->userService = $userService;
        $this->userRepository = $userRepository;
    }

    public function index(Request $request) {
        $user = $this->userRepository->all();

        return response()->json([
            'data' => $user
        ], 200);
    }
}
