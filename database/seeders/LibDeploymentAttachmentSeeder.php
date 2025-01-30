<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LibDeploymentAttachment;

class LibDeploymentAttachmentSeeder extends Seeder
{
    public function run(): void
    {
        $attachments = [
            'Installation Manual',
            'Concept Paper',
            'Test Report',
            'BPRA',
            'Data Elements',
            'ERD',
            'USE CASE',
            'USER MANUAL',
            'WIREFRAME'
        ];

        foreach ($attachments as $attachment) {
            LibDeploymentAttachment::create([
                'name' => $attachment,
                'description' => $attachment
            ]);
        }
    }
}
