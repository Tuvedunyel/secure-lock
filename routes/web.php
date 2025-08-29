<?php

use App\Http\Controllers\SecretController;
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
        Route::get('secrets/share', 'create')->name('secret.create');
    });
});

Route::controller(SecretController::class)->group(function () {
    Route::get('secrets/{secret}', 'show')->name('secret.show');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
