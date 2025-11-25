<?php
// app/Http/Controllers/StaffManagementController.php

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
     * Display all staff members
     */
    public function index()
    {
        $this->checkManager();

        $staffMembers = Staff::orderBy('created_at', 'desc')->get();

        return Inertia::render('Staff/Index', [
            'staffMembers' => $staffMembers
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
            'email' => 'required|email|unique:staffs,email',
            'role' => 'required|in:manager,sales,inventory,cashier',
            'password' => 'required|string|min:8|confirmed',
        ]);

        Staff::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('staff.index')
            ->with('success', 'Staff member added successfully.');
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
            'email' => 'required|email|unique:staffs,email,' . $staff->staff_id . ',staff_id',
            'role' => 'required|in:manager,sales,inventory,cashier',
        ]);

        $staff->update($validated);

        // Update password if provided
        if ($request->filled('password')) {
            $request->validate([
                'password' => 'required|string|min:8|confirmed',
            ]);
            
            $staff->update([
                'password' => Hash::make($request->password)
            ]);
        }

        return redirect()->route('staff.index')
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

        return redirect()->route('staff.index')
            ->with('success', 'Staff member deleted successfully.');
    }
}