import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-screen fixed left-0 top-0 pt-6 px-4">
        <div className="flex items-center gap-3 mb-8 px-2">
          <Skeleton className="w-8 h-8 rounded-lg bg-slate-200" />
          <Skeleton className="h-6 w-32 bg-slate-200" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 md:ml-64 relative min-h-screen">
        {/* Header Skeleton */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
          <Skeleton className="h-8 w-8 rounded-lg bg-slate-100 md:hidden" />
          <Skeleton className="h-6 w-48 bg-slate-200 hidden md:block" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full bg-slate-100" />
            <Skeleton className="h-8 w-8 rounded-full bg-slate-100" />
            <Skeleton className="h-10 w-32 rounded-full bg-slate-100" />
          </div>
        </div>

        {/* Page Content Skeleton */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-2">
            <div>
              <Skeleton className="h-8 w-64 bg-slate-200" />
              <Skeleton className="h-4 w-96 bg-slate-100 mt-2" />
            </div>
            <Skeleton className="h-8 w-48 bg-emerald-100/50 rounded-xl" />
          </div>

          <div className="overflow-x-auto bg-white border border-slate-200 shadow-sm rounded-3xl p-4">
            <div className="space-y-4">
              {/* Header Row Skeleton */}
              <div className="flex gap-4 border-b border-slate-100 pb-4">
                <Skeleton className="h-4 w-32 bg-slate-100" />
                <Skeleton className="h-4 w-24 bg-slate-100" />
                <Skeleton className="h-4 w-32 bg-slate-100" />
                <Skeleton className="h-4 w-24 bg-slate-100" />
              </div>
              {/* Table Rows Skeleton */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center border-b border-slate-50 py-2">
                  <div className="flex items-center gap-3 w-1/4">
                    <Skeleton className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4 bg-slate-200" />
                      <Skeleton className="h-3 w-1/2 bg-slate-100" />
                    </div>
                  </div>
                  <div className="w-1/4">
                    <Skeleton className="h-6 w-24 bg-emerald-50 rounded-md" />
                  </div>
                  <div className="w-1/4">
                    <Skeleton className="h-4 w-32 bg-slate-100" />
                  </div>
                  <div className="w-1/4 flex justify-center">
                    <Skeleton className="h-6 w-24 bg-slate-100 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
