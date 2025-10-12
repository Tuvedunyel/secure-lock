<?php

namespace App\Http\Controllers;

use App\Mail\SecretShare;
use App\Models\Secret;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Random\RandomException;

class SecretController extends Controller
{

    protected string $cipher = 'AES-256-CBC';

    public function index(Secret $secret)
    {
        $secrets = $secret->all();

        return Inertia::render('secret/index', [
            'secrets' => $secrets
        ]);
    }

    /**
     * @throws RandomException
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string|max:255',
            'name' => 'required|string|max:75',
            'recipient' => 'required|email|max:255',
            'message' => 'required|string|max:1000',
            'secret' => 'required|string|max:1000',
        ]);

        $currentDateTime = now();
        $expiresAt = $currentDateTime->addDays(7);
        $randomKey = bin2hex(random_bytes(16));

        $key = hash('sha256', $randomKey, true);
        $iv = hex2bin($randomKey);

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
            'name' => $request->name,
            'message' => $request->message,
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
        if ($secret->status === 'deleted') {
            return Inertia::render('secret/show', [
                'title' => $secret->title,
                'secret' => $secret->secret,
                'id' => $secret->id,
                'status' => $secret->status
            ]);
        }

        if (!$request->has('key')) {
            abort(404);
        }
        $key = hash('sha256', $request->key, true);
        $iv = hex2bin($request->key);
        $decrypted_secret = openssl_decrypt($secret->secret, $this->cipher, $key, 0, $iv);

        if (!$decrypted_secret) {
            abort(403, 'Invalid decryption key.');
        }

        return Inertia::render('secret/show', [
            'title' => $secret->title,
            'secret' => $decrypted_secret,
            'id' => $secret->id,
            'status' => $secret->status
        ]);
    }

    public function destroySecret(Secret $secret)
    {
        $secret->status = 'deleted';
        $secret->secret = 'This secret has been consumed and it is no longer available.';
        $secret->save();
        return;
    }

    public function destroy(Secret $secret)
    {
        $secret->delete();
        return redirect('/dashboard/secrets')->with('success', 'Secret deleted successfully!');
    }
}
