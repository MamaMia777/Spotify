import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Welcome</h1>
          <h3>Best music ever</h3>
          <Image src="/logo.jpg" width={1000} height={500} alt="spotify" />
        </div>
      </MainLayout>
    </>
  )
}
