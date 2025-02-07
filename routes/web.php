<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Application\ApplicationController;
use App\Http\Controllers\Application\ApplicationRequestController;
use App\Http\Controllers\IctInventory\IctInventoryController;
use App\Http\Controllers\Dxcloud\DxcloudController;
use App\Http\Controllers\Libraries\DeploymentRequirementsController;
use App\Http\Controllers\SQA\TestCaseController;
use App\Http\Controllers\SQA\UatController;
use App\Http\Controllers\Reports\SQATestPlanController;
use Illuminate\Support\Facades\Route;


Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::group(['middleware' => ['auth:sanctum']], function () {

        // DASHBOARD
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // PROFILE
        Route::get('/profile', array( ProfileController::class, 'edit' ))->name('profile.edit');
        Route::patch('/profile', array( ProfileController::class, 'update' ))->name('profile.update');
        Route::delete('/profile', array( ProfileController::class, 'destroy' ))->name('profile.destroy');
        Route::post('profile/avatar', [ProfileController::class, 'updateAvatar'])
            ->name('profile.avatar.update');

        // SETTINGS
        Route::prefix('settings')->group(function () {
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
            Route::post('/users', [UserController::class, 'store'])->name('users.store');
            Route::get('/users/{id}', [UserController::class, 'findById'])->name('users.show');
            Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');
            Route::delete('/users/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('users.bulk-destroy');
        });
        //END SETTINGS

        //SQA
        // TEST CASE
        Route::get('/application/{id}/sqa/test-case/view', array( TestCaseController::class, 'sqaView' ))->name('application.sqa.test-case.view');
        Route::resource('application/sqa/test-case',TestCaseController::class)->names('application.sqa.test-case');
        
        //SQA
        // UAT
        Route::get('/application/{id}/sqa/uat/view', array( UatController::class, 'sqaView' ))->name('application.sqa.uat.view');
        Route::resource('application/sqa/uat',UatController::class)->names('application.sqa.uat');
        
        // APPLICATIONS
        Route::get('/application/pending', [ApplicationController::class, 'pending'])->name('application.pending');
        Route::get('/application/approved', [ApplicationController::class, 'approved'])->name('application.approved');
        Route::get('/application/cancelled', [ApplicationController::class, 'cancelled'])->name('application.cancelled');
        Route::post('/application/{id}/update-attachment', [ApplicationController::class, 'updateAttachment'])->name('application.update-attachment');
        Route::put('/application/{id}/update-features', [ApplicationController::class, 'updateFeatures'])->name('application.update-features');
        Route::delete('/application/bulk-destroy', [ApplicationController::class, 'bulkDestroy'])->name('application.bulk-destroy');
        Route::delete('/application/attachment/{id}/delete', [ApplicationController::class, 'attachmentDelete'])->name('application-attachment.delete');
        Route::resource('application',ApplicationController::class)->names('application');

        //APPLICATION REQUEST
        Route::get('/application-request/{id}', [ApplicationRequestController::class, 'generateForm'])->name('application-request-form');
        Route::resource('application-request',ApplicationRequestController::class)->names('application-request');

        //ICT INVENTORY
        Route::delete('/ict-inventory/bulk-destroy', [IctInventoryController::class, 'bulkDestroy'])->name('ict-inventory.bulk-destroy');
        Route::resource('ict-inventory',IctInventoryController::class)->names('ict-inventory');

        // DXCLOUD
        Route::get('/dxcloud', [DxcloudController::class, 'index'])->name('dxcloud');
        Route::get('/dxcloud/download-psgc/{region_code}', [DxcloudController::class, 'download'])->name('dxcloud-download-psgc');

        // LIBRARIES
        Route::delete('/libraries/deployment-requirements/bulk-destroy', [DeploymentRequirementsController::class, 'bulkDestroy'])->name('lib-deployment-req.bulk-destroy');
        Route::resource('libraries/deployment-requirements',DeploymentRequirementsController::class)->names('lib-deployment-req');


        //REPORTS
        Route::get('/reports/sqa-test-plan', [SQATestPlanController::class, 'index'])->name('reports.sqa-test-plan');
        Route::get('/reports/sqa-test-plan/{id}', [SQATestPlanController::class, 'generate'])->name('reports.sqa-test-plan-generate');
        
       
        
});

require __DIR__ . '/auth.php';
require __DIR__ . '/guest.php';
