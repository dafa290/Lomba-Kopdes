"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ date, setDate }: { date: Date | undefined, setDate: (date: Date | undefined) => void }) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "inline-flex items-center w-[240px] justify-start text-left font-normal border border-slate-200 rounded-xl px-4 py-2 hover:bg-slate-50 transition-colors",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-xl border-slate-200 shadow-xl" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
