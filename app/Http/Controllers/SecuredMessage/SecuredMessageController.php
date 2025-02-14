<?php

namespace App\Http\Controllers\SecuredMessage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\IctInventory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\UptimeCheck;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use App\Models\SecuredMessage;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;


class SecuredMessageController extends Controller
{
    
    public function index()
    {
        $users = User::all();
        return Inertia::render('SecuredMessage/Index',[
            "users" => $users
        ]);
    }

    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'expiration' => 'date',
            'message' => 'required|string'
        ]);

        // Encrypt the message before storing
        $validated['message'] = Crypt::encrypt($validated['message']);

        // Store the encrypted data
        $record = SecuredMessage::create([
            'receiver_id' => $validated['user_id'],
            'expiration' => $validated['expiration'],
            'message' => $validated['message'],
            'sender_id' => auth()->user()->id
        ]);

        return Inertia::location(route('secured-message.show', ['secured_message' => Crypt::encrypt($record->id)]));
    }


    public function show($secured_message)
    {
        $id = Crypt::decrypt($secured_message);
        $message = SecuredMessage::findOrFail($id);

        // Check expiration
        if ($message->expiration && Carbon::now()->greaterThan($message->expiration)) {
            abort(403, 'This message has expired.');
        }
        

        // Do NOT decrypt message yet; let the frontend verify password first
        return Inertia::render('SecuredMessage/View', [
            'message' => $message,
        ]);
    }


    public function verify(Request $request, $id)
    {
        $message = SecuredMessage::findOrFail($id);
        $sender = User::find($message->sender_id);
        $receiver = User::find($message->receiver_id);

        // Validate password input
        $request->validate(['password' => 'required|string']);

        // Check if password matches sender or receiver
        if (
            Hash::check($request->password, $sender->password) ||
            Hash::check($request->password, $receiver->password)
        ) {
            return response()->json([
                'success' => true,
                'decrypted_message' => Crypt::decrypt($message->message)
            ]);
        }

        return response()->json(['success' => false, 'error' => 'Incorrect password.'], 401);
    }


}
