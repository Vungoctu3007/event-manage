<?php

namespace App\Services;

use App\Services\Interfaces\UserServiceInterface;
use App\Repositories\Interfaces\UserRepositoryInterface as UserRepository;

/**
 * Class UserService
 * @package App\Services
 */
class UserService implements UserServiceInterface
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function paginate($request) {
        $condition['keyword'] = addslashes($request->input('keyword'));
        $per_page = $request->integer('perpage');
        $users = $this->userRepository->pagination($this->paginateSelect(), $condition, [], ['path' => '/admin/users/index'], $per_page);
        return $users;
    }

    private function paginateSelect() {
        return [
            'id',
            'email',
            'phone',
            'address',
            'name',
            'publish',
            'user_catalogue_id'
        ];
    }
}
