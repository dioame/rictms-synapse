<?php
use App\Http\Controllers\Guest\SQAUAT\SQAUATController;

Route::get('/client/application/{id}/uat', [SQAUATController::class, 'index'])->name('client-uat');
Route::post('/client/application/uat', [SQAUATController::class, 'store'])->name('client-uat-post');
