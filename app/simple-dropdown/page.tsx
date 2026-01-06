import UserDropdown from "@/components/UserDropdown";

export default function SinpleDropdownPage() {
  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-background font-serif">
      <h1 className="text-center text-5xl">Simple Dropdown Page</h1>
      <UserDropdown />
    </div>
  );
}
