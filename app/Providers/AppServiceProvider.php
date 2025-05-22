<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $serviceBindings = [
        'App\Repositories\Interfaces\UserRepositoryInterface' => 'App\Repositories\UserRepository',
        'App\Services\Interfaces\UserServiceInterface' => 'App\Services\UserService',
        'App\Services\Interfaces\AuthServiceInterface' => 'App\Services\AuthService',
        'App\Repositories\Interfaces\AuthRepositoryInterface' => 'App\Repositories\AuthRepository',
        'App\Repositories\Interfaces\EventRepositoryInterface' => 'App\Repositories\EventRepository',
        'App\Services\Interfaces\EventServiceInterface' => 'App\Services\EventService',
        // 'App\Services\Interfaces\ScheduleEventRepositoryInterface' => 'App\Services\ScheduleEventRepository',
        // 'App\Services\Interfaces\TicketRepositoryInterface' => 'App\Services\TicketRepository',

    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        foreach ($this->serviceBindings as $key => $value) {
            $this->app->bind($key, $value);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
    }
}
