<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Show the contact form
     */
    public function create()
    {
        return Inertia::render('Contact');
    }

    /**
     * Store a new contact message
     */
    public function store(ContactRequest $request)
    {
        try {
            $validated = $request->validated();

            // Handle file uploads
            $uploadedFiles = [];
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $file->storeAs('public/contact-files', $fileName);
                    $uploadedFiles[] = $fileName;
                }
            }

            // Create contact record
            $contact = Contact::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone_country_code'] . ' ' . $validated['phone_number'],
                'subject' => $validated['subject'],
                'category' => $validated['category'],
                'message' => $validated['message'],
                'files' => $uploadedFiles,
                'status' => 'pending'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of contacts (for admin)
     */
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts
        ]);
    }

    /**
     * Display the specified contact
     */
    public function show(Contact $contact)
    {
        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact
        ]);
    }

    /**
     * Update contact status
     */
    public function updateStatus(Request $request, Contact $contact)
    {
        $request->validate([
            'status' => 'required|in:pending,read,replied'
        ]);

        $contact->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'تم تحديث حالة الرسالة بنجاح');
    }
}
