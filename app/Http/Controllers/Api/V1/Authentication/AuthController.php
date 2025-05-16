<?php

use App\Http\Controllers\Controller;

class AuthController extends Controller{
    private $authRepository;
    private $authService;
    public function __construct(AuthRepository $authRepository, AuthService $authService) {
        $this->authRepository = $authRepository;
        $this->authService = $authService;
    }

    

}