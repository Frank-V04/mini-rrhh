// src/pages/EmployeeDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployees";

const statusConfig = {
  active: { bg: "bg-green-100", text: "text-green-800", label: "Activo" },
  inactive: { bg: "bg-red-100", text: "text-red-800", label: "Inactivo" },
  on_leave: { bg: "bg-yellow-100", text: "text-yellow-800", label: "En permiso" },
};

function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: employee, isLoading, isError, error } = useEmployee(
    id ? Number(id) : null
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Cargando empleado…</p>
        </div>
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-2">
            {isError
              ? `Error: ${(error as Error)?.message ?? "Error desconocido"}`
              : "Empleado no encontrado."}
          </p>
          <button
            onClick={() => navigate("/empleados")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            ← Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = statusConfig[employee.status];

  const formattedSalary = new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "USD",
  }).format(employee.salary);

  const formattedHireDate = new Date(employee.hireDate).toLocaleDateString("es-GT", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/empleados")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 text-sm font-medium transition-colors"
      >
        ← Volver a empleados
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden text-white font-bold text-3xl flex-shrink-0">
            {employee.avatarUrl ? (
              <img src={employee.avatarUrl} alt={`Avatar de ${employee.name}`} className="w-full h-full object-cover" />
            ) : (
              employee.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{employee.name}</h1>
            <p className="text-blue-100 mt-1">{employee.position}</p>
            <span className={`inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle.bg} ${statusStyle.text}`}>
              {statusStyle.label}
            </span>
          </div>
        </div>

        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <DetailField label="Correo electrónico" value={employee.email} />
          <DetailField label="Departamento" value={employee.department} />
          <DetailField label="Cargo" value={employee.position} />
          <DetailField label="Salario" value={formattedSalary} />
          <DetailField label="Fecha de ingreso" value={formattedHireDate} />
          <DetailField label="Rol en el sistema" value={employee.role} />
          {employee.phone && <DetailField label="Teléfono" value={employee.phone} />}
        </div>
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      <span className="text-slate-800 font-medium">{value}</span>
    </div>
  );
}

export default EmployeeDetailPage;