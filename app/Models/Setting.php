<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'settings';

    protected $fillable = ['config_key', 'config_value'];

    /**
     * Static method to get a specific setting by its key.
     * 
     * @param string $key
     * @return string|null
     */
    public static function getSettingByKey($key)
    {
        $setting = self::where('config_key', $key)->first();
        return $setting ? $setting->config_value : null;
    }

    /**
     * Static method to get the uptime HTTP timeout setting.
     * 
     * @return string|null
     */
    public static function UPTIME_HTTP_TIMEOUTS()
    {
        return self::getSettingByKey('uptime_http_set_timeout_seconds');
    }
}
