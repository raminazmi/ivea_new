<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'filters' => [
                'search' => request('search', ''),
                'status' => request('status', 'all'),
            ],
        ]);
    }

    public function updateStatus(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,read,replied'
        ]);

        $contact = Contact::findOrFail($id);
        $contact->update($validated);

        return redirect()->back()
            ->with('success', 'تم تحديث حالة الرسالة بنجاح');
    }

    public function destroy($id): RedirectResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return redirect()->back()
            ->with('success', 'تم حذف الرسالة بنجاح');
    }
}
