<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    function get_contacts($id = null)
    {
        if ($id) {
            $contacts = Contact::find($id);
        } else {
            $contacts = Contact::all();
            return response()->json(['contacts' => $contacts]);
        }
    }
    public function removecontact($id)
    {
        $contact = Contact::find($id)->delete();
    }


    public function addOrUpdateContact(Request $request, $id = null)
    {
        if ($id === null || $id === "add") {
            $contact = new Contact();
        } else {
            $contact = Contact::find($id);

            if (!$contact) {
                return response()->json(['error' => 'Contact not found'], 404);
            }
        }
        $contact->username = $request->input('username', $contact->username);
        $contact->phonenumber = $request->input('phonenumber', $contact->phonenumber);
        $contact->address = $request->input('address', $contact->address);

        $contact->save();

        return response()->json(["contact" => $contact]);
    }
}
