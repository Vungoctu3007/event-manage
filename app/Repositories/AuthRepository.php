<?php

use App\Models\User;
use App\Repositories\BaseRepository;
class AuthRepository extends BaseRepository implements AuthRepositoryInterface
{
    public function __construct(User $user) {
        parent::__construct($user);
    }

}