<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectQuiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'space_types',
        'product_needs',
        'preferred_styles',
        'space_type_other',
        'product_other',
        'style_other',
        'additional_notes',
        'images',
        'status'
    ];

    protected $casts = [
        'space_types' => 'array',
        'product_needs' => 'array',
        'preferred_styles' => 'array',
        'images' => 'array',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_CONTACTED = 'contacted';
    const STATUS_QUOTED = 'quoted';
    const STATUS_COMPLETED = 'completed';

    const SPACE_TYPES = [
        'residential' => 'سكني',
        'offices' => 'مكاتب',
        'hotels' => 'فنادق',
        'shops' => 'محلات',
        'living_room' => 'صالة المعيشة',
        'bedroom' => 'غرفة النوم',
        'kitchen' => 'المطبخ',
        'office' => 'المكتب',
        'restaurant' => 'مطعم',
        'hotel' => 'فندق',
        'other' => 'أخرى'
    ];

    const PRODUCT_NEEDS = [
        'curtains' => 'ستائر',
        'furniture' => 'أثاث',
        'cabinets' => 'خزائن',
        'doors' => 'أبواب',
        'woodwork' => 'خشبيات',
        'finishes' => 'تشطيبات',
        'other' => 'أخرى'
    ];

    const PREFERRED_STYLES = [
        'modern' => 'عصري',
        'classic' => 'كلاسيكي',
        'minimalist' => 'بساطة',
        'luxury' => 'فخم',
        'other' => 'أخرى'
    ];
}
