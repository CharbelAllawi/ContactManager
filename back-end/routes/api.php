<?php

use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



route::get('/get_contacts/{id?}', [ContactController::class, "get_contacts"]);
Route::post('/add_update_contact/{id?}', [ContactController::class, "addOrUpdateContact"]);
Route::post('/delete_contact/{id?}', [ContactController::class, "removecontact"]);
