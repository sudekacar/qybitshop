import { redirect } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getUserById } from "@/lib/users";
import { getSession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    redirect("/login");
  }

  const user = getUserById(session.userId);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">Profilim</h1>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-zinc-200 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">{user.name}</h2>
            <p className="text-sm text-zinc-500">{user.email}</p>
          </div>
        </div>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-sm font-medium text-zinc-500">Ad Soyad</dt>
            <dd className="mt-1 text-zinc-900">{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-zinc-500">E-posta</dt>
            <dd className="mt-1 text-zinc-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-zinc-500">Rol</dt>
            <dd className="mt-1">
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium capitalize text-zinc-700">
                {user.role === "admin" ? "Yönetici" : "Kullanıcı"}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-zinc-500">Üyelik Tarihi</dt>
            <dd className="mt-1 text-zinc-900">{formatDate(user.created_at)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
