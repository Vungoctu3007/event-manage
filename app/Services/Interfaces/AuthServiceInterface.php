<?php

use App\Models\User;
use Illuminate\Http\Request;

interface AuthServiceInterface
{
    public function paginate(Request $request);
    public function login(Request $request);
    public function generateToken(User $user);
}