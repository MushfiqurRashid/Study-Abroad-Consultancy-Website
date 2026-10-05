"use client"

import { LogOut } from "lucide-react"
import { logout } from "@/app/admin/actions/auth"
import { Button } from "@/components/admin/ui/button"

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </form>
  )
}
