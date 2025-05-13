<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(User $user) {
        parent::__construct($user);
    }

    public function pagination(
        $column = ['*'],
        $condition = [],
        $join = [],
        $extend = [],
        $per_page = 20
    ) {
        $query = $this->model->select($column)->where(function($query) use ($condition) {
            if(isset($condition['keyword']) && !empty($condition['keyword'])) {
                $query->where('name', 'LIKE', '%'.$condition['keyword'].'%')
                      ->orWhere('email', 'LIKE', '%'.$condition['keyword'].'%')
                      ->orWhere('address', 'LIKE', '%'.$condition['keyword'].'%')
                      ->orWhere('phone', 'LIKE', '%'.$condition['keyword'].'%');
            }
        });
        if(!empty($join)) {
            $query->join($join);
        }
        return $query->paginate($per_page)->withQueryString()->withPath(env('APP_URL').$extend['path']);
    }
}

