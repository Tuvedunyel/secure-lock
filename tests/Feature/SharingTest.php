<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/secrets/share')->assertRedirect('/login');
});

test('authenticated users can visit the share secret page', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/secrets/share')->assertOk();
});
