<?php

namespace App\Http\Controllers;

use App\Mail\SecretShare;
use App\Models\Secret;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class SecretController extends Controller
{

    protected string $cipher = 'AES-256-CBC';

    public function index(Secret $secret)
    {
        $secrets = $secret->all();
        // Decrypt the secrets for the authenticated user
        return Inertia::render('secret/index', [
            'secrets' => $secrets
        ]);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string|max:255',
            'recipient' => 'required|email|max:255',
            'secret' => 'required|string|max:1000',
        ]);

        $currentDateTime = now();
        $expiresAt = $currentDateTime->addDays(7);
        $randomKey = bin2hex(random_bytes(16));

        // Derive a 32-byte key and a 16-byte IV from the random key token
        $key = hash('sha256', $randomKey, true); // 32 bytes for AES-256
        $iv = hex2bin($randomKey); // 16 raw bytes IV (from 32-char hex string)

        Secret::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'recipient' => $request->recipient,
            'secret' => openssl_encrypt($request->secret, $this->cipher, $key, 0, $iv),
            'status' => 'sent',
            'expires_at' => $expiresAt,
        ]);

        $sending_secret = Secret::where('title', $request->title)
            ->where('recipient', $request->recipient)
            ->where('user_id', auth()->id())
            ->where('expires_at', $expiresAt)
            ->first();

        $data = [
            'recipient' => $request->recipient,
            'title' => $request->title,
            'link' => route('secret.show', ['secret' => $sending_secret->id, 'key' => $randomKey]),
        ];

        Mail::to($request->recipient)->send(new SecretShare($data));

        return redirect('/dashboard/secrets')->with('success', 'Secret created successfully!');
    }

    public function create()
    {
        return Inertia::render('secret/create-secret');
    }

    public function show(Request $request, Secret $secret)
    {
        if (!$request->has('key')) {
            abort(404);
        }
        $key = hash('sha256', $request->key, true);
        $iv = hex2bin($request->key);
        $decrypted_secret = openssl_decrypt($secret->secret, $this->cipher, $key, 0, $iv);

        if (!$decrypted_secret) {
            abort(403, 'Invalid decryption key.');
        }

        if ($secret->status === 'viewed') {
            abort(403, 'This secret has already been viewed.');
        }
        $secret->status = 'viewed';
        $secret->save();

        return Inertia::render('secret/show', [
            'title' => $request->title,
            'secret' => $decrypted_secret
        ]);
    }

    public function edit()
    {
        return 'Edit';
    }

    public function destroy()
    {
        return 'Destroy';
    }
}
