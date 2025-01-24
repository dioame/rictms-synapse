<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Application\ApplicationController;
use App\Http\Controllers\Application\ApplicationRequestController;
use App\Http\Controllers\IctInventory\IctInventoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => ['auth:sanctum']], function () {

        // DASHBOARD
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // PROFILE
        Route::get('/profile', array( ProfileController::class, 'edit' ))->name('profile.edit');
        Route::patch('/profile', array( ProfileController::class, 'update' ))->name('profile.update');
        Route::delete('/profile', array( ProfileController::class, 'destroy' ))->name('profile.destroy');
        Route::post('profile/avatar', [ProfileController::class, 'updateAvatar'])
            ->name('profile.avatar.update');

        // SETTINGS
        Route::prefix('settings')->group(function () {
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
            Route::post('/users', [UserController::class, 'store'])->name('users.store');
            Route::get('/users/{id}', [UserController::class, 'findById'])->name('users.show');
            Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');
            Route::delete('/users/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('users.bulk-destroy');
        });
        //END SETTINGS

        // APPLICATIONS
        Route::get('/application/pending', [ApplicationController::class, 'pending'])->name('application.pending');
        Route::get('/application/approved', [ApplicationController::class, 'approved'])->name('application.approved');
        Route::get('/application/cancelled', [ApplicationController::class, 'cancelled'])->name('application.cancelled');
        Route::delete('/application/bulk-destroy', [ApplicationController::class, 'bulkDestroy'])->name('application.bulk-destroy');
        Route::resource('application',ApplicationController::class)->names('application');

        //APPLICATION REQUEST
        Route::get('/application-request/{id}', [ApplicationRequestController::class, 'generateForm'])->name('application-request');

        //ICT INVENTORY
        Route::delete('/ict-inventory/bulk-destroy', [IctInventoryController::class, 'bulkDestroy'])->name('ict-inventory.bulk-destroy');
        Route::resource('ict-inventory',IctInventoryController::class)->names('ict-inventory');
        
});

require __DIR__ . '/auth.php';
