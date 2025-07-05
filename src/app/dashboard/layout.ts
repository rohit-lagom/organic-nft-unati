import Sidebar from '@/app/dashboard/_components/sidebar/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar/>
      <div className="flex-1 bg-[#242424] text-white p-8">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold">Dashboard </h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
