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
    }  public function removecontact($id)
    {
        $contact = Contact::find($id)->delete();
    }
