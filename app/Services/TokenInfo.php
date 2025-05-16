<?php

namespace App\Services;

class TokenInfo
{
    public $token;
    public $expireAt;

    public function __construct($token, $expireAt)
    {
        $this->token = $token;
        $this->expireAt = $expireAt;
    }
}
