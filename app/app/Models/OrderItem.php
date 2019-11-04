<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = 'orderItems';
    protected $fillable = ['orderId', 'productId', 'count'];
}
