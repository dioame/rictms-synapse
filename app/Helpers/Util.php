<?php

namespace App\Helpers;

class Util
{
    public static function formatDate($date)
    {
        return \Carbon\Carbon::parse($date)->format('F j, Y');
    }

    // Example of another utility function
    public static function slugify($text)
    {
        return str_replace(' ', '-', strtolower($text));
    }
}
