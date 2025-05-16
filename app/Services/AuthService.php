<?php

use App\Models\User;
use App\Services\TokenInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService implements AuthServiceInterface{
    protected $key;
    protected $authRepository;
    public function __construct(AuthRepository $authRepository) {
        $this->key = env('JWT_SECRET');
        $this->authRepository = $authRepository;
    }

     public function paginate(Request $request) {
        
    }
    public function login(Request $request) {
       
    }

    public function generateToken(User $user){
   
        $issueAt = new DateTime();
        $expireAt = (clone $issueAt)->modify('+1 hour');

        $payload = [
            'sub' => $user->full_name,
            'iss' => 'ticketbox.com',
            'iat' => $issuedAt->getTimestamp(),
            'exp' => $expireAt->getTimestamp(),
            'jti' => (string) \Str::uuid(),
            'user_id' => $user->id,
            'username' => $user->full_name,
            'email' => $user->email,
            'role' => $user->role,
        ];

        try {
            // Tạo JWT Token
            $jwt = JWTAuth::encode($payload, $this->key);
            return new TokenInfo($jwt, $expireAt);
        } catch (\Exception $e) {
            Log::error("Cannot create token", ['error' => $e->getMessage()]);
            throw new AppException('UNAUTHENTICATED');
        }
    }

}
