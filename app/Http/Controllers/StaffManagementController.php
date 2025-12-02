<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StaffManagementController extends Controller
{
    /**
     * Check if user is manager
     */
    protected function checkManager()
    {
        if (auth()->guard('staff')->user()->role !== 'manager') {
            abort(403, 'Only managers can access this page.');
        }
    }

    /**
     * Display paginated staff list
     */
    public function index()
    {
        $this->checkManager();

        $staffs = Staff::latest()->paginate(20);

        return Inertia::render('Staff/Index', [
            'staffs' => $staffs
        ]);
    }

    /**
     * Show create staff form
     */
    public function create()
    {
        $this->checkManager();

        return Inertia::render('Staff/Create');
    }

    /**
     * Store new staff member
     */
    public function store(Request $request)
    {
        $this->checkManager();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:staffs,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:manager,sales,inventory,cashier',
        ], [
            'email.unique' => 'This email is already registered.',
            'role.in' => 'Role must be manager, sales, inventory, or cashier.',
        ]);

        Staff::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->route('staff-management.index')
            ->with('success', 'Staff member created successfully.');
    }

    /**
     * Show edit staff form
     */
    public function edit(Staff $staff)
    {
        $this->checkManager();

        return Inertia::render('Staff/Edit', [
            'staff' => $staff
        ]);
    }

    /**
     * Update staff member
     */
    public function update(Request $request, Staff $staff)
    {
        $this->checkManager();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:staffs,email,' . $staff->staff_id . ',staff_id',
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|in:manager,sales,inventory,cashier',
        ], [
            'email.unique' => 'This email is already registered.',
            'role.in' => 'Role must be manager, sales, inventory, or cashier.',
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $staff->update($data);

        return redirect()->route('staff-management.index')
            ->with('success', 'Staff member updated successfully.');
    }

    /**
     * Delete staff member
     */
    public function destroy(Staff $staff)
    {
        $this->checkManager();

        // Prevent deleting yourself
        if ($staff->staff_id === auth()->guard('staff')->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $staff->delete();

        return redirect()->route('staff-management.index')
            ->with('success', 'Staff member deleted successfully.');
    }
}