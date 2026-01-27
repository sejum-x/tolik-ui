import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/Landing/LandingPage';
import { LoginPage } from '@/pages/Login/LoginPage';
import { DashboardPage } from '@/pages/Dashboard/DashboardPage';
import { WorkspacePage } from '@/pages/Workspace/WorkspacePage';
import { ProfilePage } from '@/pages/Profile/ProfilePage';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';
import { MainLayout } from '@/layouts/MainLayout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Private */}
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/workspace/:id" element={<WorkspacePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* 404  */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;