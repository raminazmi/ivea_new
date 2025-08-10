<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::recent();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->has('date_from') && !empty($request->date_from)) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->has('date_to') && !empty($request->date_to)) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $orders = $query->paginate(15);

        $statistics = [
            'total' => Order::count(),
            'pending' => Order::where('status', 'pending')->count(),
            'confirmed' => Order::where('status', 'confirmed')->count(),
            'processing' => Order::where('status', 'processing')->count(),
            'shipped' => Order::where('status', 'shipped')->count(),
            'delivered' => Order::where('status', 'delivered')->count(),
            'cancelled' => Order::where('status', 'cancelled')->count(),
            'total_amount' => Order::sum('total_amount')
        ];

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'statistics' => $statistics,
            'filters' => $request->only(['status', 'search', 'date_from', 'date_to'])
        ]);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->status = $validated['status'];

        if ($validated['status'] === 'confirmed' && !$order->confirmed_at) {
            $order->confirmed_at = now();
        }

        $order->save();

        return redirect()->back()->with('success', 'تم تحديث حالة الطلب بنجاح');
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('success', 'تم حذف الطلب بنجاح');
    }

    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'order_ids' => 'required|array',
            'order_ids.*' => 'integer'
        ]);

        Order::whereIn('id', $validated['order_ids'])->delete();

        return redirect()->back()
            ->with('success', 'تم حذف الطلبات المحددة بنجاح');
    }

    public function export(Request $request)
    {
        $query = Order::recent();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $orders = $query->get();

        $csvData = [];
        $csvData[] = [
            'رقم الطلب',
            'الاسم الكامل',
            'البريد الإلكتروني',
            'رقم الهاتف',
            'المدينة',
            'العنوان',
            'إجمالي المبلغ',
            'عدد المنتجات',
            'الحالة',
            'تاريخ الطلب'
        ];

        foreach ($orders as $order) {
            $csvData[] = [
                $order->order_number,
                $order->full_name,
                $order->email,
                $order->phone,
                $order->city,
                $order->address,
                $order->total_amount,
                $order->total_items,
                $order->status_label,
                $order->created_at->format('Y-m-d H:i:s')
            ];
        }

        $filename = 'orders_' . date('Y_m_d_H_i_s') . '.csv';

        $handle = fopen('php://output', 'w');

        header('Content-Type: text/csv; charset=UTF-8');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Pragma: no-cache');
        header('Expires: 0');

        fputs($handle, $bom = (chr(0xEF) . chr(0xBB) . chr(0xBF)));

        foreach ($csvData as $row) {
            fputcsv($handle, $row);
        }

        fclose($handle);
        exit;
    }
}
