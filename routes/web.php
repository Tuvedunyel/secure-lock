<?php

use App\Http\Controllers\SecretController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(SecretController::class)->group(function () {
        Route::get('dashboard/secrets', 'index')->name('secret.index');
        Route::post('dashboard/secrets', 'store')->name('secret.store');
        Route::get('dashboard/secrets/share', 'create')->name('secret.create');
        Route::delete('dashboard/secrets/{secret}', 'destroy')->name('secret.destroy');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('dashboard/users', 'index')->name('user.index');
        Route::delete('dashboard/users/{user}', 'destroy')->name('user.destroy');
    });
});

Route::controller(SecretController::class)->group(function () {
    Route::get('secrets/{secret}', 'show')->name('secret.show');
    Route::delete('secrets/{secret}', 'destroySecret')->name('secret.destroySecret');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
