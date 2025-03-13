import React from "react";

import { Footer, Navbar, Seo } from "@/components/shared";

const Page = () => {
  return (
    <>
      <Seo title="Testimonials" />
      <Navbar />
      <main className="w-full">
        <section className="h-screen bg-gradient-to-b from-primary-100 to-white py-20 lg:py-40">
          <div className="container mx-auto flex flex-col items-center justify-center gap-20 px-4 lg:px-0">
            <h1 className="font-semibold lg:text-4xl">Testimonials</h1>
            <div className="w-full space-y-5"></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;
