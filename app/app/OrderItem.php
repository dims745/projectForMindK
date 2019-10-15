<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = 'orderItems';
    protected $fillable = ['orderId', 'productId', 'count'];
}
