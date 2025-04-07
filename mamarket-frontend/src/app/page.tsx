import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Hoşgeldiniz!</h1>
        <Link href="/login">
          <a className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded">
            Giriş Yap
          </a>
        </Link>
      </div>
    </div>
  );
}
