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
        'App\Repositories\Interfaces\ScheduleEventRepositoryInterface' => 'App\Repositories\ScheduleEventRepository',
        'App\Repositories\Interfaces\TicketRepositoryInterface' => 'App\Repositories\TicketRepository',
        'App\Services\Interfaces\TicketServiceInterface' => 'App\Services\TicketService',
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
    public function boot(): void {}
}
