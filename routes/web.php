<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\VirusTotalController;
use App\Http\Controllers\Application\ApplicationController;
use App\Http\Controllers\Application\ApplicationRequestController;
use App\Http\Controllers\IctInventory\IctInventoryController;
use App\Http\Controllers\Dxcloud\DxcloudController;
use App\Http\Controllers\Security\SecurityController;
use App\Http\Controllers\Security\DataCenterAccessController;
use App\Http\Controllers\Libraries\DeploymentRequirementsController;
use App\Http\Controllers\SQA\TestCaseController;
use App\Http\Controllers\SQA\UatController;
use App\Http\Controllers\Reports\SQATestPlanController;
use App\Http\Controllers\SoftwareSubscription\SoftwareSubscriptionController;
use App\Http\Controllers\SecuredMessage\SecuredMessageController;
use Illuminate\Support\Facades\Route;


Route::get('/', [LandingController::class, 'index'])->name('landing');
Route::resource('secured-message', SecuredMessageController::class)
->only(['show'])
->names('secured-message');
Route::post('/secured-message/verify/{id}', [SecuredMessageController::class, 'verify'])->name('secured-message.verify');

Route::group(['middleware' => ['auth:sanctum']], function () {

        // DASHBOARD
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // PROFILE
        Route::get('/profile', array( ProfileController::class, 'edit' ))->name('profile.edit');
        Route::patch('/profile', array( ProfileController::class, 'update' ))->name('profile.update');
        Route::delete('/profile', array( ProfileController::class, 'destroy' ))->name('profile.destroy');
        Route::post('profile/avatar', [ProfileController::class, 'updateAvatar'])
            ->name('profile.avatar.update');

        Route::group(['middleware' => ['role:admin']], function () {
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
        });

        Route::group(['middleware' => ['role:admin|sqa']], function () {
            //SQA
            // TEST CASE
            Route::get('/application/{id}/sqa/test-case/view', array( TestCaseController::class, 'sqaView' ))->name('application.sqa.test-case.view');
            Route::resource('application/sqa/test-case',TestCaseController::class)->names('application.sqa.test-case');
            
            //SQA
            // UAT
            Route::get('/application/{id}/sqa/uat/view', array( UatController::class, 'sqaView' ))->name('application.sqa.uat.view');
            Route::resource('application/sqa/uat',UatController::class)->names('application.sqa.uat');
        });
        
        // APPLICATIONS
        Route::middleware(['role:admin'])->group(function () {
            Route::post('/application/{id}/update-attachment', [ApplicationController::class, 'updateAttachment'])->name('application.update-attachment');
            Route::put('/application/{id}/update-features', [ApplicationController::class, 'updateFeatures'])->name('application.update-features');
            Route::delete('/application/bulk-destroy', [ApplicationController::class, 'bulkDestroy'])->name('application.bulk-destroy');
            Route::delete('/application/attachment/{id}/delete', [ApplicationController::class, 'attachmentDelete'])->name('application-attachment.delete');
        
            Route::resource('application', ApplicationController::class)
                ->except(['index', 'show']) // Exclude GET routes
                ->names('application');
        });

        Route::get('/application/timeline', [ApplicationController::class, 'timeline'])->name('application.timeline');

        Route::get('/application/km', [ApplicationController::class, 'km'])->name('application.km');
        Route::get('/application/pia', [ApplicationController::class, 'pia'])->name('application.pia');
        Route::get('/application/db', [ApplicationController::class, 'db'])->name('application.db');
        Route::get('/application/server', [ApplicationController::class, 'server'])->name('application.server');
        Route::resource('application', ApplicationController::class)
            ->only(['index', 'show'])
            ->names('application');

        
        Route::get('/application-request/{id}', [ApplicationRequestController::class, 'generateForm'])->name('application-request-form');
        Route::resource('application-request',ApplicationRequestController::class)->names('application-request');

        // DXCLOUD
        Route::get('/dxcloud', [DxcloudController::class, 'index'])->name('dxcloud');
        Route::get('/dxcloud/download-psgc/{region_code}', [DxcloudController::class, 'download'])->name('dxcloud-download-psgc');

        Route::group(['middleware' => ['role:admin']], function () {
        // LIBRARIES
            Route::delete('/libraries/deployment-requirements/bulk-destroy', [DeploymentRequirementsController::class, 'bulkDestroy'])->name('lib-deployment-req.bulk-destroy');
            Route::resource('libraries/deployment-requirements',DeploymentRequirementsController::class)->names('lib-deployment-req');
        });

        //REPORTS
        Route::group(['middleware' => ['role:admin|sqa']], function () { 
            Route::get('/reports/sqa-test-plan', [SQATestPlanController::class, 'index'])->name('reports.sqa-test-plan');
            Route::get('/reports/sqa-test-plan/{id}', [SQATestPlanController::class, 'generate'])->name('reports.sqa-test-plan-generate');
        });


        

        Route::group(['middleware' => ['exclude_role:user']], function () { 

            //ICT INVENTORY
            Route::delete('/ict-inventory/bulk-destroy', [IctInventoryController::class, 'bulkDestroy'])->name('ict-inventory.bulk-destroy');
            Route::resource('ict-inventory',IctInventoryController::class)->names('ict-inventory');
            
            Route::resource('software-subscription', SoftwareSubscriptionController::class)->names('software-subscription');
            Route::get('/security/data-center/access/form/{id}', [DataCenterAccessController::class, 'form'])->name('security.data-center-access.form');
            Route::resource('security/data-center/access', DataCenterAccessController::class)->names('security.data-center-access');
        });

        Route::post('/security/checks', [SecurityController::class, 'getSecurityChecksResult'])->name('security.checks');
        Route::get('/security/test', [SecurityController::class, 'test'])->name('security.test');
        Route::resource('security', SecurityController::class)->names('security');
       
        // Route::resource('secured-message', SecuredMessageController::class)->names('secured-message');       
        Route::resource('secured-message', SecuredMessageController::class)
        ->except(['show'])
        ->names('secured-message');


        Route::get('/virus-total', [VirusTotalController::class, 'index'])->name('virus-total.index');
        Route::post('/virus-total/check', [VirusTotalController::class, 'check'])->name('virus-total.check');
        
        
});



require __DIR__ . '/auth.php';
require __DIR__ . '/guest.php';
