import { Navigate, Route, Routes } from "react-router-dom";
import { Historik } from "./pages/Historik";
import { Indstillinger } from "./pages/Indstillinger";
import { LigeNu } from "./pages/LigeNu";
import { Oversigt } from "./pages/Oversigt";
import { MobileLayout } from "./components/templates/MobileLayout";
import { DesktopLayout } from "./components/templates/DesktopLayout";
import { useIsDesktop } from "./hooks/useIsDesktop";

function App() {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
  return (
    <Routes>
      <Route path="/" element={<DesktopLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lige-nu" replace />} />
      <Route element={<MobileLayout />}>
        <Route path="/oversigt" element={<Oversigt />} />
        <Route path="/lige-nu" element={<LigeNu />} />
        <Route path="/historik" element={<Historik />} />
        <Route path="/indstillinger" element={<Indstillinger />} />
      </Route>
    </Routes>
  );
}

export default App;
