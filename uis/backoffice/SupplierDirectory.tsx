"use client";

import { useCallback, useEffect, useState } from "react";

export interface Supplier {
  id: number;
  name: string;
  country: string;
  product_categories: string[];
  rate: number;
  status: "active" | "suspended";
  updated_at: string;
}

export default function SupplierDirectory() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8001/suppliers");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuppliers((await res.json()) as Supplier[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  if (loading) return <p className="text-gray-500">Loading suppliers…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Supplier Directory</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Country</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Categories</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Rate (€)</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {suppliers.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-4 py-3 text-gray-700">{s.country}</td>
                <td className="px-4 py-3 text-gray-700">{s.product_categories.join(", ")}</td>
                <td className="px-4 py-3 text-right text-gray-900">{s.rate.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      s.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {suppliers.length === 0 && (
        <p className="text-gray-400 text-center py-8">No suppliers registered yet.</p>
      )}
    </div>
  );
}