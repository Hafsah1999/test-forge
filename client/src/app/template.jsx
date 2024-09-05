'use client';

import React from 'react'
import { AppProvider } from './Context/teacherContext';
import { StudentProvider } from './Context/studentContext';
import { AdminProvider } from './Context/adminContext';

const Template = ({ children }) => {
    return (
        <AppProvider>
            <AdminProvider>
            <StudentProvider>
            {children}
            </StudentProvider>
            </AdminProvider>
            </AppProvider>
    )
}

export default Template