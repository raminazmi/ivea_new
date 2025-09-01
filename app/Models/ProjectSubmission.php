<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'images',
        'description',
        'product_type',
        'space_details',
        'status',
        'estimated_cost',
        'admin_notes',
        'contacted_at'
    ];

    protected $casts = [
        'images' => 'array',
        'space_details' => 'array',
        'estimated_cost' => 'decimal:2',
        'contacted_at' => 'datetime'
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_IN_REVIEW = 'in_review';
    const STATUS_QUOTED = 'quoted';
    const STATUS_APPROVED = 'approved';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_COMPLETED = 'completed';

    const PRODUCT_TYPES = [
        'curtains' => 'ستائر',
        'furniture' => 'أثاث',
        'sofas' => 'كنب',
        'cabinets' => 'خزائن',
        'woodwork' => 'خشبيات',
        'finishes' => 'تشطيبات',
        'lighting' => 'إضاءة',
        'flooring' => 'أرضيات',
        'wallpaper' => 'ورق جدران',
        'other' => 'أخرى'
    ];

    public function getStatusNameAttribute()
    {
        return match ($this->status) {
            self::STATUS_PENDING => 'في الانتظار',
            self::STATUS_IN_REVIEW => 'قيد المراجعة',
            self::STATUS_QUOTED => 'تم تقديم عرض سعر',
            self::STATUS_APPROVED => 'تمت الموافقة',
            self::STATUS_IN_PROGRESS => 'قيد التنفيذ',
            self::STATUS_COMPLETED => 'مكتمل',
            default => 'غير محدد'
        };
    }

    public function getProductTypeNameAttribute()
    {
        return self::PRODUCT_TYPES[$this->product_type] ?? 'غير محدد';
    }
}
