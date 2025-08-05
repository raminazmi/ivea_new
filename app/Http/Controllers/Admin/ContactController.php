<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of contacts for admin.
     */
    public function index()
    {
        $contacts = Contact::latest()->get();

        // Debug: Log the contacts data
        \Log::info('Contacts data:', ['count' => $contacts->count(), 'data' => $contacts->toArray()]);

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Update contact status.
     */
    public function updateContactStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,read,replied'
        ]);

        $contact = Contact::findOrFail($id);
        $contact->update(['status' => $request->status]);

        return \Response::json([
            'success' => true,
            'message' => 'تم تحديث حالة الرسالة بنجاح'
        ]);
    }
}
