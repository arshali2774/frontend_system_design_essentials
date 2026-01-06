import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-background font-serif">
      <h1 className="text-center text-5xl">
        Frontend System Design Essentials
      </h1>
      <ol className="list-decimal grid grid-cols-4 border border-foreground rounded-lg p-10 gap-5">
        <li>
          <Link className="flex items-center gap-2" href="/simple-dropdown">
            <Button variant={"link"} className="cursor-pointer text-xl">
              Simple Dropdown Example
            </Button>
          </Link>
        </li>
      </ol>
    </div>
  );
}
